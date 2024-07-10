import {
	defineComponent,
	// @ts-ignore
	h,
	onMounted,
	onUpdated,
	ref,
	useSlots,
} from "vue";

export type State = {
	nodes: any[];
	parentUpdated: boolean;
};

export const tunnel = () => {
	const nodes = ref<any[]>([]);
	const resetNodes = ref<boolean>(true);

	const handleParentUpdate = () => {
		if (resetNodes.value) nodes.value = [];
		resetNodes.value = true;
	};

	onMounted(handleParentUpdate);
	onUpdated(handleParentUpdate);

	return {
		In: defineComponent(() => {
			const slots = useSlots();

			const getChildren = () => slots.default?.() ?? [];
			const handleInputUpdate = () => {
				resetNodes.value = false;
				nodes.value = getChildren();
			};

			onMounted(handleInputUpdate);
			onUpdated(handleInputUpdate);

			return () => {};
		}),
		Out: defineComponent(() => {
			return () => nodes.value;
		}),
	};
};
