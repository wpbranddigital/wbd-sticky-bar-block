<?php
/**
 * Plugin Name:       NoticeBar Sticky Banner Block
 * Description:       Create sticky announcement, promotion, and CTA bars directly in the WordPress Block Editor.
 * Version:           1.0.0
 * Requires at least: 6.5
 * Requires PHP:      7.4
 * Author:            WPBrand Digital
 * Author URI:        https://wpbranddigital.org
 * License:           GPLv2 or later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       noticebar-sticky-banner-block
 * Domain Path:       /languages
 *
 * @package NoticeBarStickyBannerBlock
 */

defined( 'ABSPATH' ) || exit;

define( 'NSBB_VERSION', '1.0.0' );
define( 'NSBB_PATH', plugin_dir_path( __FILE__ ) );

require_once NSBB_PATH . 'includes/helpers.php';
require_once NSBB_PATH . 'includes/render.php';

/**
 * Registers the Sticky Bar block from its block.json metadata.
 *
 * Frontend CSS and JavaScript declared in block.json are enqueued by
 * WordPress only on pages where the block is rendered.
 *
 * @return void
 */
function nsbb_register_block() {
	register_block_type( NSBB_PATH . 'build/sticky-bar' );
}
add_action( 'init', 'nsbb_register_block' );
