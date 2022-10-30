import { Ref } from "solid-js"

export default function ref<T>(content?: T) {
  return { content }
}

export function forwardRef<T>(props: { ref?: Ref<T> }, value: T) {
  if (props.ref) {
    if (typeof props.ref === 'function') {
      (props.ref as Function)(value)
    } else {
      props.ref = value
    }
  }
}
