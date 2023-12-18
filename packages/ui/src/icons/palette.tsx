export default function PaletteIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2 12c0 5.523 4.477 10 10 10a3 3 0 003-3v-.5c0-.464 0-.697.026-.892a3 3 0 012.582-2.582c.195-.026.428-.026.892-.026h.5a3 3 0 003-3c0-5.523-4.477-10-10-10S2 6.477 2 12z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="M7 13a1 1 0 100-2 1 1 0 000 2zM16 9a1 1 0 100-2 1 1 0 000 2zM10 8a1 1 0 100-2 1 1 0 000 2z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}
