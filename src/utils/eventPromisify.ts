export default function eventPromisify<T extends EventTarget>(
  target: T,
  event: Parameters<T['addEventListener']>[0],
  handler: Parameters<T['addEventListener']>[1]
) {
}
