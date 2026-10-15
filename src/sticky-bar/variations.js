/**
 * Starter presets, registered as block variations so they appear in the
 * inserter and can be switched from the block sidebar.
 */
import { __ } from '@wordpress/i18n';

const variations = [
	{
		name: 'announcement',
		title: __( 'Announcement Bar', 'noticebar-sticky-banner-block' ),
		description: __(
			'A sticky bar for news and announcements.',
			'noticebar-sticky-banner-block'
		),
		isDefault: true,
		scope: [ 'inserter', 'transform' ],
		attributes: {
			preset: 'announcement',
			position: 'top',
			ctaText: __( 'Learn More', 'noticebar-sticky-banner-block' ),
			ctaBackgroundColor: '#ffffff',
			ctaTextColor: '#1d4ed8',
			style: {
				color: { background: '#1d4ed8', text: '#ffffff' },
			},
		},
		innerBlocks: [
			[
				'core/paragraph',
				{
					content: __(
						'📢 We just launched something new!',
						'noticebar-sticky-banner-block'
					),
				},
			],
		],
	},
	{
		name: 'promotion',
		title: __( 'Promotion Bar', 'noticebar-sticky-banner-block' ),
		description: __(
			'Highlight a sale or limited-time offer.',
			'noticebar-sticky-banner-block'
		),
		scope: [ 'inserter', 'transform' ],
		attributes: {
			preset: 'promotion',
			position: 'top',
			ctaText: __( 'Shop Now', 'noticebar-sticky-banner-block' ),
			ctaBackgroundColor: '#ffffff',
			ctaTextColor: '#b91c1c',
			ctaFontWeight: '700',
			style: {
				color: {
					gradient:
						'linear-gradient(90deg, #b91c1c 0%, #c2410c 100%)',
					text: '#ffffff',
				},
			},
		},
		innerBlocks: [
			[
				'core/paragraph',
				{
					content: __(
						'🔥 Get 30% Off — Limited Time',
						'noticebar-sticky-banner-block'
					),
				},
			],
		],
	},
	{
		name: 'cta',
		title: __( 'CTA Bar', 'noticebar-sticky-banner-block' ),
		description: __(
			'Drive visitors to a single call to action.',
			'noticebar-sticky-banner-block'
		),
		scope: [ 'inserter', 'transform' ],
		attributes: {
			preset: 'cta',
			position: 'bottom',
			ctaText: __( 'Get Started', 'noticebar-sticky-banner-block' ),
			ctaBackgroundColor: '#facc15',
			ctaTextColor: '#111827',
			ctaBorderRadius: 999,
			ctaPaddingX: 20,
			style: {
				color: { background: '#111827', text: '#ffffff' },
			},
		},
		innerBlocks: [
			[
				'core/paragraph',
				{
					content: __(
						'🚀 Build Faster with Gutenberg',
						'noticebar-sticky-banner-block'
					),
				},
			],
		],
	},
	{
		name: 'free-shipping',
		title: __( 'Free Shipping Bar', 'noticebar-sticky-banner-block' ),
		description: __(
			'Let shoppers know about free shipping.',
			'noticebar-sticky-banner-block'
		),
		scope: [ 'inserter', 'transform' ],
		attributes: {
			preset: 'free-shipping',
			position: 'top',
			ctaText: __( 'Shop Now', 'noticebar-sticky-banner-block' ),
			ctaBackgroundColor: '#065f46',
			ctaTextColor: '#ffffff',
			style: {
				color: { background: '#ecfdf5', text: '#065f46' },
			},
		},
		innerBlocks: [
			[
				'core/paragraph',
				{
					content: __(
						'🚚 Free Shipping on Orders Over $50',
						'noticebar-sticky-banner-block'
					),
				},
			],
		],
	},
];

variations.forEach( ( variation ) => {
	variation.isActive = [ 'preset' ];
} );

export default variations;
