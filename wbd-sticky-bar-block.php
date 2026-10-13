<?php
/**
 * Plugin Name:       WBD Sticky Bar Block
 * Description:       Create sticky announcement, promotion, and CTA bars directly in the WordPress Block Editor.
 * Version:           1.0.0
 * Requires at least: 6.5
 * Requires PHP:      7.4
 * Author:            WPBrand Digital
 * Author URI:        https://wpbranddigital.org
 * License:           GPLv2 or later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       wbd-sticky-bar-block
 * Domain Path:       /languages
 *
 * @package WBDStickyBarBlock
 */

defined( 'ABSPATH' ) || exit;

define( 'STICKY_BAR_BLOCK_VERSION', '1.0.0' );
define( 'STICKY_BAR_BLOCK_PATH', plugin_dir_path( __FILE__ ) );

require_once STICKY_BAR_BLOCK_PATH . 'includes/helpers.php';
require_once STICKY_BAR_BLOCK_PATH . 'includes/render.php';

/**
 * Registers the Sticky Bar block from its block.json metadata.
 *
 * Frontend CSS and JavaScript declared in block.json are enqueued by
 * WordPress only on pages where the block is rendered.
 *
 * @return void
 */
function sticky_bar_block_register_block() {
	load_plugin_textdomain( 'wbd-sticky-bar-block', false, dirname( plugin_basename( __FILE__ ) ) . '/languages' );
	register_block_type( STICKY_BAR_BLOCK_PATH . 'build/sticky-bar' );
}
add_action( 'init', 'sticky_bar_block_register_block' );
