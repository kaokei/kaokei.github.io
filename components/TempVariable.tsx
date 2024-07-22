export default function (props: any, { slots, emit, attrs }: any) {
  return slots.default(attrs);
}
