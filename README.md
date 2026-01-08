# demo-use-thunk

The repository provides a demo for using [`use-thunk`](https://github.com/chhsiao1981/use-thunk).

More specifically, we would like to:

1. Implement thunk-modules Parent, Child, GrandChild and the corresponding ui-modules Parent, Child, GrandChild.
2. Starting use-thunk 10.0.0, we can specify the GrandChild thunk-module directly in the GrandChild ui. There is no need to specify the GrandChild thunk in Parent ui and pass it down to the GrandChild ui.
3. The ui can be updated if we do operations on the GrandChild ui.
