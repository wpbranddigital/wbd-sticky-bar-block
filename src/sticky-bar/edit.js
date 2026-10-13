/**
 * Sticky Bar block editor UI.
 */
import { __, sprintf } from '@wordpress/i18n';
import { useEffect } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import {
	BlockControls,
	FontSizePicker,
	InnerBlocks,
	InspectorControls,
	JustifyContentControl,
	PanelColorSettings,
	RichText,
	URLInput,
	useBlockProps,
	useInnerBlocksProps,
	store as blockEditorStore,
} from '@wordpress/block-editor';
import {
	Notice,
	PanelBody,
	RangeControl,
	SelectControl,
	TextControl,
	ToggleControl,
	ToolbarButton,
	ToolbarGroup,
} from '@wordpress/components';

import CloseIcon from './close-icon';

const ALLOWED_BLOCKS = [ 'core/paragraph', 'core/heading' ];

const TEMPLATE = [
	[
		'core/paragraph',
		{
			placeholder: __( 'Write your announcement…', 'wbd-sticky-bar-block' ),
		},
	],
];

/**
 * Tracks which block instance owns each bar ID so duplicated blocks
 * receive a fresh ID (the ID is used as the dismissal storage key).
 */
const barIdOwners = new Map();

const FONT_WEIGHTS = [
	{ label: __( 'Default', 'wbd-sticky-bar-block' ), value: '' },
	{ label: __( 'Regular (400)', 'wbd-sticky-bar-block' ), value: '400' },
	{ label: __( 'Medium (500)', 'wbd-sticky-bar-block' ), value: '500' },
	{ label: __( 'Semi-bold (600)', 'wbd-sticky-bar-block' ), value: '600' },
	{ label: __( 'Bold (700)', 'wbd-sticky-bar-block' ), value: '700' },
	{ label: __( 'Extra-bold (800)', 'wbd-sticky-bar-block' ), value: '800' },
];

export default function Edit( {
	attributes,
	setAttributes,
	clientId,
	isSelected,
} ) {
	const {
		barId,
		position,
		offset,
		zIndex,
		adminBarOffset,
		contentJustification,
		gap,
		contentMaxWidth,
		stackOnMobile,
		ariaLabel,
		showCta,
		ctaText,
		ctaUrl,
		ctaNewTab,
		ctaBackgroundColor,
		ctaTextColor,
		ctaBorderRadius,
		ctaPaddingY,
		ctaPaddingX,
		ctaFontSize,
		ctaFontWeight,
		showClose,
		closeIconSize,
		closeIconColor,
		dismissMemory,
		hideOnDesktop,
		hideOnTablet,
		hideOnMobile,
		animation,
	} = attributes;

	// Assign a stable, unique ID used for remembering dismissal.
	useEffect( () => {
		const owner = barIdOwners.get( barId );
		if ( ! barId || ( owner && owner !== clientId ) ) {
			setAttributes( {
				barId: `sbb-${ clientId.replace( /-/g, '' ).slice( 0, 10 ) }`,
			} );
			return;
		}
		barIdOwners.set( barId, clientId );
		return () => {
			if ( barIdOwners.get( barId ) === clientId ) {
				barIdOwners.delete( barId );
			}
		};
	}, [ barId, clientId, setAttributes ] );

	const blockProps = useBlockProps( {
		className: [
			'sbb-bar',
			'sbb-editor-preview',
			`sbb-position-${ position }`,
			`sbb-justify-${ contentJustification }`,
		].join( ' ' ),
		style: {
			'--sbb-gap': `${ gap }px`,
			...( contentMaxWidth
				? { '--sbb-content-max-width': `${ contentMaxWidth }px` }
				: {} ),
		},
	} );

	const hasInnerBlocks = useSelect(
		( select ) => select( blockEditorStore ).getBlockCount( clientId ) > 0,
		[ clientId ]
	);

	// Keep the bar compact: only show the block appender when it is empty.
	const innerBlocksProps = useInnerBlocksProps(
		{ className: 'sbb-content' },
		{
			allowedBlocks: ALLOWED_BLOCKS,
			template: TEMPLATE,
			templateLock: false,
			renderAppender: hasInnerBlocks
				? false
				: InnerBlocks.ButtonBlockAppender,
		}
	);

	const ctaStyle = {
		backgroundColor: ctaBackgroundColor || undefined,
		color: ctaTextColor || undefined,
		borderRadius: `${ ctaBorderRadius }px`,
		padding: `${ ctaPaddingY }px ${ ctaPaddingX }px`,
		fontSize: ctaFontSize || undefined,
		fontWeight: ctaFontWeight || undefined,
	};

	const hiddenOn = [
		hideOnDesktop && __( 'desktop', 'wbd-sticky-bar-block' ),
		hideOnTablet && __( 'tablet', 'wbd-sticky-bar-block' ),
		hideOnMobile && __( 'mobile', 'wbd-sticky-bar-block' ),
	].filter( Boolean );

	const positionLabel =
		'top' === position
			? __( 'Top', 'wbd-sticky-bar-block' )
			: __( 'Bottom', 'wbd-sticky-bar-block' );

	let badge = sprintf(
		/* translators: %s: bar position, e.g. Top or Bottom. */
		__( 'Sticky bar · %s', 'wbd-sticky-bar-block' ),
		positionLabel
	);
	if ( hiddenOn.length ) {
		badge +=
			' · ' +
			sprintf(
				/* translators: %s: comma-separated list of devices. */
				__( 'Hidden on %s', 'wbd-sticky-bar-block' ),
				hiddenOn.join( ', ' )
			);
	}

	return (
		<>
			<BlockControls group="block">
				<JustifyContentControl
					allowedControls={ [
						'left',
						'center',
						'right',
						'space-between',
					] }
					value={ contentJustification }
					onChange={ ( value ) =>
						setAttributes( {
							contentJustification: value || 'center',
						} )
					}
				/>
				<ToolbarGroup>
					<ToolbarButton
						icon="arrow-up-alt"
						label={ __( 'Stick to top', 'wbd-sticky-bar-block' ) }
						isPressed={ 'top' === position }
						onClick={ () => setAttributes( { position: 'top' } ) }
					/>
					<ToolbarButton
						icon="arrow-down-alt"
						label={ __( 'Stick to bottom', 'wbd-sticky-bar-block' ) }
						isPressed={ 'bottom' === position }
						onClick={ () =>
							setAttributes( { position: 'bottom' } )
						}
					/>
				</ToolbarGroup>
			</BlockControls>

			<InspectorControls>
				<PanelBody
					title={ __( 'Sticky settings', 'wbd-sticky-bar-block' ) }
				>
					<SelectControl
						__nextHasNoMarginBottom
						__next40pxDefaultSize
						label={ __( 'Position', 'wbd-sticky-bar-block' ) }
						value={ position }
						options={ [
							{
								label: __( 'Top', 'wbd-sticky-bar-block' ),
								value: 'top',
							},
							{
								label: __( 'Bottom', 'wbd-sticky-bar-block' ),
								value: 'bottom',
							},
						] }
						onChange={ ( value ) =>
							setAttributes( { position: value } )
						}
					/>
					<RangeControl
						__nextHasNoMarginBottom
						__next40pxDefaultSize
						label={ __( 'Offset (px)', 'wbd-sticky-bar-block' ) }
						help={ __(
							'Distance from the edge of the screen.',
							'wbd-sticky-bar-block'
						) }
						value={ offset }
						min={ 0 }
						max={ 200 }
						onChange={ ( value ) =>
							setAttributes( { offset: value ?? 0 } )
						}
					/>
					<RangeControl
						__nextHasNoMarginBottom
						__next40pxDefaultSize
						label={ __( 'Z-index', 'wbd-sticky-bar-block' ) }
						help={ __(
							'Raise this only if the bar appears behind other elements.',
							'wbd-sticky-bar-block'
						) }
						value={ zIndex }
						min={ 1 }
						max={ 99998 }
						onChange={ ( value ) =>
							setAttributes( { zIndex: value ?? 999 } )
						}
					/>
					{ 'top' === position && (
						<ToggleControl
							__nextHasNoMarginBottom
							label={ __(
								'Stay below the admin toolbar',
								'wbd-sticky-bar-block'
							) }
							help={ __(
								'Adds space for the WordPress toolbar when you are logged in.',
								'wbd-sticky-bar-block'
							) }
							checked={ adminBarOffset }
							onChange={ ( value ) =>
								setAttributes( { adminBarOffset: value } )
							}
						/>
					) }
					<SelectControl
						__nextHasNoMarginBottom
						__next40pxDefaultSize
						label={ __( 'Entrance animation', 'wbd-sticky-bar-block' ) }
						help={ __(
							'Animations are turned off for visitors who prefer reduced motion.',
							'wbd-sticky-bar-block'
						) }
						value={ animation }
						options={ [
							{
								label: __( 'None', 'wbd-sticky-bar-block' ),
								value: 'none',
							},
							{
								label: __( 'Fade', 'wbd-sticky-bar-block' ),
								value: 'fade',
							},
							{
								label: __( 'Slide', 'wbd-sticky-bar-block' ),
								value: 'slide',
							},
						] }
						onChange={ ( value ) =>
							setAttributes( { animation: value } )
						}
					/>
				</PanelBody>

				<PanelBody
					title={ __( 'Layout', 'wbd-sticky-bar-block' ) }
					initialOpen={ false }
				>
					<SelectControl
						__nextHasNoMarginBottom
						__next40pxDefaultSize
						label={ __( 'Content alignment', 'wbd-sticky-bar-block' ) }
						value={ contentJustification }
						options={ [
							{
								label: __( 'Left', 'wbd-sticky-bar-block' ),
								value: 'left',
							},
							{
								label: __( 'Center', 'wbd-sticky-bar-block' ),
								value: 'center',
							},
							{
								label: __( 'Right', 'wbd-sticky-bar-block' ),
								value: 'right',
							},
							{
								label: __(
									'Space between',
									'wbd-sticky-bar-block'
								),
								value: 'space-between',
							},
						] }
						onChange={ ( value ) =>
							setAttributes( { contentJustification: value } )
						}
					/>
					<RangeControl
						__nextHasNoMarginBottom
						__next40pxDefaultSize
						label={ __( 'Gap (px)', 'wbd-sticky-bar-block' ) }
						value={ gap }
						min={ 0 }
						max={ 80 }
						onChange={ ( value ) =>
							setAttributes( { gap: value ?? 16 } )
						}
					/>
					<RangeControl
						__nextHasNoMarginBottom
						__next40pxDefaultSize
						label={ __(
							'Content max width (px)',
							'wbd-sticky-bar-block'
						) }
						help={ __(
							'Set to 0 to use the full width.',
							'wbd-sticky-bar-block'
						) }
						value={ contentMaxWidth }
						min={ 0 }
						max={ 1920 }
						step={ 10 }
						onChange={ ( value ) =>
							setAttributes( { contentMaxWidth: value ?? 0 } )
						}
					/>
					<ToggleControl
						__nextHasNoMarginBottom
						label={ __( 'Stack on mobile', 'wbd-sticky-bar-block' ) }
						checked={ stackOnMobile }
						onChange={ ( value ) =>
							setAttributes( { stackOnMobile: value } )
						}
					/>
				</PanelBody>

				<PanelBody
					title={ __( 'Call to action', 'wbd-sticky-bar-block' ) }
					initialOpen={ false }
				>
					<ToggleControl
						__nextHasNoMarginBottom
						label={ __( 'Show button', 'wbd-sticky-bar-block' ) }
						checked={ showCta }
						onChange={ ( value ) =>
							setAttributes( { showCta: value } )
						}
					/>
					{ showCta && (
						<>
							<p className="sbb-help">
								{ __(
									'Edit the button text directly in the bar.',
									'wbd-sticky-bar-block'
								) }
							</p>
							<div className="sbb-url-control">
								<URLInput
									__nextHasNoMarginBottom
									label={ __( 'URL', 'wbd-sticky-bar-block' ) }
									value={ ctaUrl }
									onChange={ ( value ) =>
										setAttributes( { ctaUrl: value } )
									}
								/>
							</div>
							{ ! ctaUrl && (
								<Notice
									status="warning"
									isDismissible={ false }
								>
									{ __(
										'Add a URL to display the button on your site.',
										'wbd-sticky-bar-block'
									) }
								</Notice>
							) }
							<ToggleControl
								__nextHasNoMarginBottom
								label={ __(
									'Open in new tab',
									'wbd-sticky-bar-block'
								) }
								checked={ ctaNewTab }
								onChange={ ( value ) =>
									setAttributes( { ctaNewTab: value } )
								}
							/>
							<RangeControl
								__nextHasNoMarginBottom
								__next40pxDefaultSize
								label={ __(
									'Border radius (px)',
									'wbd-sticky-bar-block'
								) }
								value={ ctaBorderRadius }
								min={ 0 }
								max={ 999 }
								onChange={ ( value ) =>
									setAttributes( {
										ctaBorderRadius: value ?? 4,
									} )
								}
							/>
							<RangeControl
								__nextHasNoMarginBottom
								__next40pxDefaultSize
								label={ __(
									'Vertical padding (px)',
									'wbd-sticky-bar-block'
								) }
								value={ ctaPaddingY }
								min={ 0 }
								max={ 40 }
								onChange={ ( value ) =>
									setAttributes( { ctaPaddingY: value ?? 8 } )
								}
							/>
							<RangeControl
								__nextHasNoMarginBottom
								__next40pxDefaultSize
								label={ __(
									'Horizontal padding (px)',
									'wbd-sticky-bar-block'
								) }
								value={ ctaPaddingX }
								min={ 0 }
								max={ 80 }
								onChange={ ( value ) =>
									setAttributes( {
										ctaPaddingX: value ?? 16,
									} )
								}
							/>
							<FontSizePicker
								__next40pxDefaultSize
								value={ ctaFontSize || undefined }
								onChange={ ( value ) =>
									setAttributes( {
										ctaFontSize: value
											? String( value )
											: '',
									} )
								}
							/>
							<SelectControl
								__nextHasNoMarginBottom
								__next40pxDefaultSize
								label={ __(
									'Font weight',
									'wbd-sticky-bar-block'
								) }
								value={ ctaFontWeight }
								options={ FONT_WEIGHTS }
								onChange={ ( value ) =>
									setAttributes( { ctaFontWeight: value } )
								}
							/>
						</>
					) }
				</PanelBody>

				{ showCta && (
					<PanelColorSettings
						title={ __( 'Button colors', 'wbd-sticky-bar-block' ) }
						initialOpen={ false }
						colorSettings={ [
							{
								label: __( 'Background', 'wbd-sticky-bar-block' ),
								value: ctaBackgroundColor,
								onChange: ( value ) =>
									setAttributes( {
										ctaBackgroundColor: value || '',
									} ),
							},
							{
								label: __( 'Text', 'wbd-sticky-bar-block' ),
								value: ctaTextColor,
								onChange: ( value ) =>
									setAttributes( {
										ctaTextColor: value || '',
									} ),
							},
						] }
					/>
				) }

				<PanelBody
					title={ __( 'Close button', 'wbd-sticky-bar-block' ) }
					initialOpen={ false }
				>
					<ToggleControl
						__nextHasNoMarginBottom
						label={ __( 'Show close button', 'wbd-sticky-bar-block' ) }
						checked={ showClose }
						onChange={ ( value ) =>
							setAttributes( { showClose: value } )
						}
					/>
					{ showClose && (
						<>
							<RangeControl
								__nextHasNoMarginBottom
								__next40pxDefaultSize
								label={ __(
									'Icon size (px)',
									'wbd-sticky-bar-block'
								) }
								value={ closeIconSize }
								min={ 12 }
								max={ 48 }
								onChange={ ( value ) =>
									setAttributes( {
										closeIconSize: value ?? 20,
									} )
								}
							/>
							<SelectControl
								__nextHasNoMarginBottom
								__next40pxDefaultSize
								label={ __(
									'After closing',
									'wbd-sticky-bar-block'
								) }
								value={ dismissMemory }
								options={ [
									{
										label: __(
											'Show again on next page load',
											'wbd-sticky-bar-block'
										),
										value: 'none',
									},
									{
										label: __(
											'Keep hidden for the browser session',
											'wbd-sticky-bar-block'
										),
										value: 'session',
									},
									{
										label: __(
											'Keep hidden on this device',
											'wbd-sticky-bar-block'
										),
										value: 'local',
									},
								] }
								onChange={ ( value ) =>
									setAttributes( { dismissMemory: value } )
								}
							/>
						</>
					) }
				</PanelBody>

				{ showClose && (
					<PanelColorSettings
						title={ __( 'Close icon color', 'wbd-sticky-bar-block' ) }
						initialOpen={ false }
						colorSettings={ [
							{
								label: __( 'Icon', 'wbd-sticky-bar-block' ),
								value: closeIconColor,
								onChange: ( value ) =>
									setAttributes( {
										closeIconColor: value || '',
									} ),
							},
						] }
					/>
				) }

				<PanelBody
					title={ __( 'Visibility', 'wbd-sticky-bar-block' ) }
					initialOpen={ false }
				>
					<ToggleControl
						__nextHasNoMarginBottom
						label={ __( 'Hide on desktop', 'wbd-sticky-bar-block' ) }
						help={ __(
							'Screens wider than 1024px.',
							'wbd-sticky-bar-block'
						) }
						checked={ hideOnDesktop }
						onChange={ ( value ) =>
							setAttributes( { hideOnDesktop: value } )
						}
					/>
					<ToggleControl
						__nextHasNoMarginBottom
						label={ __( 'Hide on tablet', 'wbd-sticky-bar-block' ) }
						help={ __(
							'Screens 600px–1024px wide.',
							'wbd-sticky-bar-block'
						) }
						checked={ hideOnTablet }
						onChange={ ( value ) =>
							setAttributes( { hideOnTablet: value } )
						}
					/>
					<ToggleControl
						__nextHasNoMarginBottom
						label={ __( 'Hide on mobile', 'wbd-sticky-bar-block' ) }
						help={ __(
							'Screens narrower than 600px.',
							'wbd-sticky-bar-block'
						) }
						checked={ hideOnMobile }
						onChange={ ( value ) =>
							setAttributes( { hideOnMobile: value } )
						}
					/>
				</PanelBody>

				<PanelBody
					title={ __( 'Accessibility', 'wbd-sticky-bar-block' ) }
					initialOpen={ false }
				>
					<TextControl
						__nextHasNoMarginBottom
						__next40pxDefaultSize
						label={ __( 'Region label', 'wbd-sticky-bar-block' ) }
						help={ __(
							'Announced by screen readers. Defaults to “Announcement”.',
							'wbd-sticky-bar-block'
						) }
						value={ ariaLabel }
						onChange={ ( value ) =>
							setAttributes( { ariaLabel: value } )
						}
					/>
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				{ isSelected && (
					<span className="sbb-editor-badge">{ badge }</span>
				) }
				<div className="sbb-inner">
					<div { ...innerBlocksProps } />
					{ showCta && (
						<span className="sbb-cta" style={ ctaStyle }>
							<RichText
								tagName="span"
								aria-label={ __(
									'Button text',
									'wbd-sticky-bar-block'
								) }
								placeholder={ __(
									'Add text…',
									'wbd-sticky-bar-block'
								) }
								value={ ctaText }
								onChange={ ( value ) =>
									setAttributes( { ctaText: value } )
								}
								allowedFormats={ [] }
								withoutInteractiveFormatting
							/>
						</span>
					) }
				</div>
				{ showClose && (
					<span
						className="sbb-close"
						aria-hidden="true"
						style={
							closeIconColor
								? { color: closeIconColor }
								: undefined
						}
					>
						<CloseIcon size={ closeIconSize } />
					</span>
				) }
			</div>
		</>
	);
}
