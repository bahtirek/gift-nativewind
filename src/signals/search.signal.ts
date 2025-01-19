import { signal, effect } from "@preact/signals-react";

const searchQuerySignal = signal("");

effect(() => {
  console.log("effect", searchQuerySignal.value)
})

export default searchQuerySignal;
