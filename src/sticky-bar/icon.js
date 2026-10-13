/**
 * Block icon: a page with a highlighted bar across the top.
 */
import { SVG, Path, Rect } from '@wordpress/primitives';

const icon = (
	<SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
		<Path d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2Zm.5 16a.5.5 0 0 1-.5.5H5a.5.5 0 0 1-.5-.5V9.5h15V19Z" />
		<Rect x="6" y="12" width="8" height="1.5" rx=".75" />
		<Rect x="6" y="15" width="12" height="1.5" rx=".75" />
	</SVG>
);

export default icon;
