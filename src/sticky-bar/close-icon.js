/**
 * Close ("X") icon for the editor preview.
 * The same path is used in includes/render.php.
 *
 * @param {Object} props      Component props.
 * @param {number} props.size Icon size in pixels.
 * @return {Element} SVG icon.
 */
export default function CloseIcon( { size = 20 } ) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			width={ size }
			height={ size }
			aria-hidden="true"
			focusable="false"
		>
			<path d="M13.06 12l5.47-5.47-1.06-1.06L12 10.94 6.53 5.47 5.47 6.53 10.94 12l-5.47 5.47 1.06 1.06L12 13.06l5.47 5.47 1.06-1.06L13.06 12z" />
		</svg>
	);
}
