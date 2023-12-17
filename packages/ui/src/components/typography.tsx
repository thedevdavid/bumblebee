export function TypographyH1({ children }: { children?: React.ReactNode }) {
  return (
    <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
      {children}
    </h1>
  );
}
export function TypographyH2({ children }: { children?: React.ReactNode }) {
  return (
    <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
      {children}
    </h2>
  );
}
export function TypographyH3({ children }: { children?: React.ReactNode }) {
  return (
    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
      {children}
    </h3>
  );
}

export function TypographyH4({ children }: { children?: React.ReactNode }) {
  return (
    <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
      {children}
    </h4>
  );
}
export function TypographyP({ children }: { children?: React.ReactNode }) {
  return <p className="leading-7 [&:not(:first-child)]:mt-6">{children}</p>;
}
export function TypographyBlockquote({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <blockquote className="mt-6 border-l-2 pl-6 italic">{children}</blockquote>
  );
}
// export function TypographyTable({ children}: { children?: React.ReactNode}) {
//   return (
//     <div className="my-6 w-full overflow-y-auto">
//       <table className="w-full">
//         <thead>
//           <tr className="m-0 border-t p-0 even:bg-muted">
//             <th className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">
//               King's Treasury
//             </th>
//             <th className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">
//               People's happiness
//             </th>
//           </tr>
//         </thead>
//         <tbody>
//           <tr className="m-0 border-t p-0 even:bg-muted">
//             <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
//               Empty
//             </td>
//             <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
//               Overflowing
//             </td>
//           </tr>
//           <tr className="m-0 border-t p-0 even:bg-muted">
//             <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
//               Modest
//             </td>
//             <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
//               Satisfied
//             </td>
//           </tr>
//           <tr className="m-0 border-t p-0 even:bg-muted">
//             <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
//               Full
//             </td>
//             <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
//               Ecstatic
//             </td>
//           </tr>
//         </tbody>
//       </table>
//     </div>
//   )
// }
export function TypographyList({ children }: { children?: React.ReactNode }) {
  return <ul className="my-6 ml-6 list-disc [&>li]:mt-2">{children}</ul>;
}
export function TypographyInlineCode({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <code className="bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
      {children}
    </code>
  );
}

export function TypographyLead({ children }: { children?: React.ReactNode }) {
  return <p className="text-muted-foreground text-xl">{children}</p>;
}
export function TypographyLarge({ children }: { children?: React.ReactNode }) {
  return <div className="text-lg font-semibold">{children}</div>;
}
export function TypographySmall({ children }: { children?: React.ReactNode }) {
  return <small className="text-sm font-medium leading-none">{children}</small>;
}
export function TypographyMuted({ children }: { children?: React.ReactNode }) {
  return <p className="text-muted-foreground text-sm">{children}</p>;
}
