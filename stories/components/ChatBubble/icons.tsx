// Exact path data for the chatBubble's state icons (Figma nodes below).
// Every baked fill matched a real token exactly, so all are tokenized
// instead of hardcoded.
//
// The tail (nodes 15785:10073/10078/10087) is NOT reproduced as an SVG
// asset here — see ChatBubble.module.css's file header for why: rotating
// its non-square bounding box left a subpixel seam against the bubble
// edge. It's drawn as a plain CSS triangle instead, filled with the exact
// same background-color variable as the bubble, so there's no separate
// asset edge left to misalign.

// node 15785:10081 ("Correct")
export function CorrectIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
      <path
        d="M0 8C0 3.58172 3.58172 0 8 0H16C20.4183 0 24 3.58172 24 8V16C24 20.4183 20.4183 24 16 24H8C3.58172 24 0 20.4183 0 16V8Z"
        fill="var(--color-feedback-success-bold)"
      />
      <path
        d="M16.571 8.85737L10.2859 15.1426L7.42903 12.2857"
        stroke="var(--color-feedback-success-onBold)"
        strokeWidth="2.57143"
        strokeLinecap="round"
      />
    </svg>
  );
}

// node 15785:10090 ("Vector", the incorrect "X" mark)
export function IncorrectIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.67827 4.01019e-07H16.3217C17.3951 -1.29323e-05 18.2808 -2.63403e-05 19.0024 0.0589337C19.7519 0.12016 20.4408 0.251574 21.088 0.581307C22.0915 1.09263 22.9073 1.90852 23.4187 2.91205C23.7484 3.55917 23.8799 4.24811 23.9411 4.99757C24 5.71916 24 6.60496 24 7.67824V16.3217C24 17.3951 24 18.2808 23.9411 19.0024C23.8799 19.7519 23.7484 20.4408 23.4187 21.088C22.9073 22.0915 22.0915 22.9073 21.088 23.4187C20.4408 23.7484 19.7519 23.8799 19.0024 23.9411C18.2808 24 17.3951 24 16.3217 24H7.67824C6.60496 24 5.71916 24 4.99757 23.9411C4.24811 23.8799 3.55917 23.7484 2.91205 23.4187C1.90852 22.9073 1.09263 22.0915 0.581307 21.088C0.251574 20.4408 0.12016 19.7519 0.0589337 19.0024C-2.63403e-05 18.2808 -1.29323e-05 17.3951 4.01019e-07 16.3217V7.67825C-1.29323e-05 6.60497 -2.63403e-05 5.71915 0.0589337 4.99757C0.12016 4.24811 0.251574 3.55917 0.581307 2.91205C1.09263 1.90852 1.90852 1.09263 2.91205 0.581307C3.55917 0.251574 4.24811 0.12016 4.99757 0.0589337C5.71915 -2.63403e-05 6.605 -1.29323e-05 7.67827 4.01019e-07ZM8.94281 7.05719C8.42211 6.53649 7.57789 6.53649 7.05719 7.05719C6.53649 7.57789 6.53649 8.42211 7.05719 8.94281L10.1144 12L7.05719 15.0572C6.53649 15.5779 6.53649 16.4221 7.05719 16.9428C7.57789 17.4635 8.42211 17.4635 8.94281 16.9428L12 13.8856L15.0572 16.9428C15.5779 17.4635 16.4221 17.4635 16.9428 16.9428C17.4635 16.4221 17.4635 15.5779 16.9428 15.0572L13.8856 12L16.9428 8.94281C17.4635 8.42211 17.4635 7.57789 16.9428 7.05719C16.4221 6.53649 15.5779 6.53649 15.0572 7.05719L12 10.1144L8.94281 7.05719Z"
        fill="var(--color-feedback-error-onBold)"
      />
    </svg>
  );
}
