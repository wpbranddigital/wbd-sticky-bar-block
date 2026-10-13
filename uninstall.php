<?php
/**
 * Uninstall routine for Sticky Bar Block.
 *
 * The plugin stores no options, custom tables, or transients, so there is
 * nothing to remove from the database. Sticky bars live inside post content
 * as blocks and remain there so user content is never destroyed.
 *
 * @package StickyBarBlock
 */

defined( 'WP_UNINSTALL_PLUGIN' ) || exit;
