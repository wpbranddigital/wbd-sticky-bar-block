/**
 * Hybrid block: only the nested content (InnerBlocks) is saved to post
 * content. The bar wrapper, CTA and close button are rendered in PHP
 * (render.php) so output is escaped server-side and the markup can evolve
 * without block validation errors.
 */
import { InnerBlocks } from '@wordpress/block-editor';

export default function save() {
	return <InnerBlocks.Content />;
}
