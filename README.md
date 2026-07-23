# demo-use-thunk

The repository provides a demo for using [`use-thunk`](https://github.com/chhsiao1981/use-thunk).

More specifically:

1. Implement thunk-modules [parent](https://github.com/chhsiao1981/demo-use-thunk/blob/main/src/thunks/parent.ts), [child](https://github.com/chhsiao1981/demo-use-thunk/blob/main/src/thunks/child.ts), [grandChild](https://github.com/chhsiao1981/demo-use-thunk/blob/main/src/thunks/grandChild.ts) and the corresponding ui-components [Parent](https://github.com/chhsiao1981/demo-use-thunk/blob/main/src/components/Parent.tsx), [Child](https://github.com/chhsiao1981/demo-use-thunk/blob/main/src/components/Child.tsx), [GrandChild](https://github.com/chhsiao1981/demo-use-thunk/blob/main/src/components/GrandChild.tsx).
2. Implement thunk-module [user](https://github.com/chhsiao1981/demo-use-thunk/blob/main/src/thunks/user.ts) as the ui-component-independent thunk-module.
3. We can see that `user` info are shared across [Header](https://github.com/chhsiao1981/demo-use-thunk/blob/main/src/components/Header.tsx#L8), [Parent](https://github.com/chhsiao1981/demo-use-thunk/blob/main/src/components/Parent.tsx#L15), and [GrandChild](https://github.com/chhsiao1981/demo-use-thunk/blob/main/src/components/GrandChild.tsx#L18).
4. We can see from [Parent](https://github.com/chhsiao1981/demo-use-thunk/blob/main/src/components/Parent.tsx#L9) that there is only 1 default `parent`. This `parent` is shared in [main](https://github.com/chhsiao1981/demo-use-thunk/blob/main/src/main.tsx#L20) and in [App](https://github.com/chhsiao1981/demo-use-thunk/blob/main/src/App.tsx#L23)
5. The [children ids in Parent](https://github.com/chhsiao1981/demo-use-thunk/blob/main/src/components/Parent.tsx#L17) are generated independently. Therefore, there are 4 different children in the corresponding Child components.
6. We can see that [grand children ids are defined in Parent](https://github.com/chhsiao1981/demo-use-thunk/blob/main/src/components/Parent.tsx#L20) and passed through `Children`'s parameters. There are totally 8 different grand children in the corresponding GrandChild components.
7. We can see that [parent](https://github.com/chhsiao1981/demo-use-thunk/blob/main/src/thunks/parent.ts#L19) and [child](https://github.com/chhsiao1981/demo-use-thunk/blob/main/src/thunks/child.ts#L31) are equipped with async counter. The counters of parent (1 parent) and children (4 children) work independently.
8. Through filtering `child` in the console log and adjusting all intervals of children to be 10 seconds, we can that updating 1 grandChild successfully re-renders object-wise GrandChild without re-rendering Parent, Child, and other GrandChildren.
