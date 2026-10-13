/**
 * Sticky Bar block registration.
 */
import { registerBlockType } from '@wordpress/blocks';

import './style.scss';
import './editor.scss';

import metadata from './block.json';
import Edit from './edit';
import save from './save';
import icon from './icon';
import variations from './variations';

registerBlockType( metadata.name, {
	icon,
	edit: Edit,
	save,
	variations,
} );
