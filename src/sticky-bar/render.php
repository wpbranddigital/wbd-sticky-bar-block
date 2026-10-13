<?php
/**
 * Frontend render template for the Sticky Bar block.
 *
 * @package StickyBarBlock
 *
 * @var array    $attributes Block attributes.
 * @var string   $content    Rendered inner blocks.
 * @var WP_Block $block      Block instance.
 */

defined( 'ABSPATH' ) || exit;

// phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- All output is escaped inside sticky_bar_block_render().
echo sticky_bar_block_render( $attributes, $content );
