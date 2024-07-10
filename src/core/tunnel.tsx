import {
	defineComponent,
	// @ts-ignore
	h,
	onMounted,
	onUpdated,
	ref,
	useSlots,
	VNode,
	VNodeChild,
} from "vue";

type State = {
	nodes: VNodeChild;
};

export const tunnel = () => {
	const store = ref<State>({
		nodes: [],
	});

	return {
		In: defineComponent(() => {
			const slots = useSlots();
			const updateStore = () => {
				store.value.nodes =
					slots.default?.().map((slot) => slot.children as VNode[]) ?? [];
			};

			onMounted(updateStore);
			onUpdated(updateStore);

			return () => {};
		}, {}),
		Out: defineComponent(() => {
			// @ts-ignore
			return () => store.value.nodes;
		}),
	};
};
