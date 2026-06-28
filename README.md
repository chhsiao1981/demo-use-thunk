# demo-use-thunk

The repository provides a demo for using [`use-thunk`](https://github.com/chhsiao1981/use-thunk).

More specifically, we would like to:

1. Implement thunk-modules parent, child, grandChild and the corresponding ui-components Parent, Child, GrandChild.
2. Implement thunk-module user as the ui-component-independent thunk-module.
3. With ui-component GrandGrandChild, reflecting that the re-rendering in GrandChild does not affect the sub-virtual-DOMs if the data-object is not updated.
4. Through console logs, we can see that updating grandChild successfully re-renders GrandChild (module-wise) / GrandGrandChild (object-wise) without re-rendering Parent and Child.
