/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/sticky-bar/close-icon.js"
/*!**************************************!*\
  !*** ./src/sticky-bar/close-icon.js ***!
  \**************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CloseIcon)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);

/**
 * Close ("X") icon for the editor preview.
 * The same path is used in includes/render.php.
 *
 * @param {Object} props      Component props.
 * @param {number} props.size Icon size in pixels.
 * @return {Element} SVG icon.
 */
function CloseIcon({
  size = 20
}) {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    width: size,
    height: size,
    "aria-hidden": "true",
    focusable: "false",
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
      d: "M13.06 12l5.47-5.47-1.06-1.06L12 10.94 6.53 5.47 5.47 6.53 10.94 12l-5.47 5.47 1.06 1.06L12 13.06l5.47 5.47 1.06-1.06L13.06 12z"
    })
  });
}

/***/ },

/***/ "./src/sticky-bar/edit.js"
/*!********************************!*\
  !*** ./src/sticky-bar/edit.js ***!
  \********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Edit)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _close_icon__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./close-icon */ "./src/sticky-bar/close-icon.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__);
/**
 * Sticky Bar block editor UI.
 */







const ALLOWED_BLOCKS = ['core/paragraph', 'core/heading'];
const TEMPLATE = [['core/paragraph', {
  placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Write your announcement…', 'noticebar-sticky-banner-block')
}]];

/**
 * Tracks which block instance owns each bar ID so duplicated blocks
 * receive a fresh ID (the ID is used as the dismissal storage key).
 */
const barIdOwners = new Map();
const FONT_WEIGHTS = [{
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Default', 'noticebar-sticky-banner-block'),
  value: ''
}, {
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Regular (400)', 'noticebar-sticky-banner-block'),
  value: '400'
}, {
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Medium (500)', 'noticebar-sticky-banner-block'),
  value: '500'
}, {
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Semi-bold (600)', 'noticebar-sticky-banner-block'),
  value: '600'
}, {
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Bold (700)', 'noticebar-sticky-banner-block'),
  value: '700'
}, {
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Extra-bold (800)', 'noticebar-sticky-banner-block'),
  value: '800'
}];
function Edit({
  attributes,
  setAttributes,
  clientId,
  isSelected
}) {
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
    animation
  } = attributes;

  // Assign a stable, unique ID used for remembering dismissal.
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    const owner = barIdOwners.get(barId);
    if (!barId || owner && owner !== clientId) {
      setAttributes({
        barId: `sbb-${clientId.replace(/-/g, '').slice(0, 10)}`
      });
      return;
    }
    barIdOwners.set(barId, clientId);
    return () => {
      if (barIdOwners.get(barId) === clientId) {
        barIdOwners.delete(barId);
      }
    };
  }, [barId, clientId, setAttributes]);
  const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.useBlockProps)({
    className: ['sbb-bar', 'sbb-editor-preview', `sbb-position-${position}`, `sbb-justify-${contentJustification}`].join(' '),
    style: {
      '--sbb-gap': `${gap}px`,
      ...(contentMaxWidth ? {
        '--sbb-content-max-width': `${contentMaxWidth}px`
      } : {})
    }
  });
  const hasInnerBlocks = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.useSelect)(select => select(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.store).getBlockCount(clientId) > 0, [clientId]);

  // Keep the bar compact: only show the block appender when it is empty.
  const innerBlocksProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.useInnerBlocksProps)({
    className: 'sbb-content'
  }, {
    allowedBlocks: ALLOWED_BLOCKS,
    template: TEMPLATE,
    templateLock: false,
    renderAppender: hasInnerBlocks ? false : _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.InnerBlocks.ButtonBlockAppender
  });
  const ctaStyle = {
    backgroundColor: ctaBackgroundColor || undefined,
    color: ctaTextColor || undefined,
    borderRadius: `${ctaBorderRadius}px`,
    padding: `${ctaPaddingY}px ${ctaPaddingX}px`,
    fontSize: ctaFontSize || undefined,
    fontWeight: ctaFontWeight || undefined
  };
  const hiddenOn = [hideOnDesktop && (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('desktop', 'noticebar-sticky-banner-block'), hideOnTablet && (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('tablet', 'noticebar-sticky-banner-block'), hideOnMobile && (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('mobile', 'noticebar-sticky-banner-block')].filter(Boolean);
  const positionLabel = 'top' === position ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Top', 'noticebar-sticky-banner-block') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Bottom', 'noticebar-sticky-banner-block');
  let badge = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.sprintf)(/* translators: %s: bar position, e.g. Top or Bottom. */
  (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Sticky bar · %s', 'noticebar-sticky-banner-block'), positionLabel);
  if (hiddenOn.length) {
    badge += ' · ' + (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.sprintf)(/* translators: %s: comma-separated list of devices. */
    (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Hidden on %s', 'noticebar-sticky-banner-block'), hiddenOn.join(', '));
  }
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.BlockControls, {
      group: "block",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.JustifyContentControl, {
        allowedControls: ['left', 'center', 'right', 'space-between'],
        value: contentJustification,
        onChange: value => setAttributes({
          contentJustification: value || 'center'
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.ToolbarGroup, {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.ToolbarButton, {
          icon: "arrow-up-alt",
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Stick to top', 'noticebar-sticky-banner-block'),
          isPressed: 'top' === position,
          onClick: () => setAttributes({
            position: 'top'
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.ToolbarButton, {
          icon: "arrow-down-alt",
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Stick to bottom', 'noticebar-sticky-banner-block'),
          isPressed: 'bottom' === position,
          onClick: () => setAttributes({
            position: 'bottom'
          })
        })]
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.InspectorControls, {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.PanelBody, {
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Sticky settings', 'noticebar-sticky-banner-block'),
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.SelectControl, {
          __nextHasNoMarginBottom: true,
          __next40pxDefaultSize: true,
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Position', 'noticebar-sticky-banner-block'),
          value: position,
          options: [{
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Top', 'noticebar-sticky-banner-block'),
            value: 'top'
          }, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Bottom', 'noticebar-sticky-banner-block'),
            value: 'bottom'
          }],
          onChange: value => setAttributes({
            position: value
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.RangeControl, {
          __nextHasNoMarginBottom: true,
          __next40pxDefaultSize: true,
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Offset (px)', 'noticebar-sticky-banner-block'),
          help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Distance from the edge of the screen.', 'noticebar-sticky-banner-block'),
          value: offset,
          min: 0,
          max: 200,
          onChange: value => setAttributes({
            offset: value ?? 0
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.RangeControl, {
          __nextHasNoMarginBottom: true,
          __next40pxDefaultSize: true,
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Z-index', 'noticebar-sticky-banner-block'),
          help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Raise this only if the bar appears behind other elements.', 'noticebar-sticky-banner-block'),
          value: zIndex,
          min: 1,
          max: 99998,
          onChange: value => setAttributes({
            zIndex: value ?? 999
          })
        }), 'top' === position && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.ToggleControl, {
          __nextHasNoMarginBottom: true,
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Stay below the admin toolbar', 'noticebar-sticky-banner-block'),
          help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Adds space for the WordPress toolbar when you are logged in.', 'noticebar-sticky-banner-block'),
          checked: adminBarOffset,
          onChange: value => setAttributes({
            adminBarOffset: value
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.SelectControl, {
          __nextHasNoMarginBottom: true,
          __next40pxDefaultSize: true,
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Entrance animation', 'noticebar-sticky-banner-block'),
          help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Animations are turned off for visitors who prefer reduced motion.', 'noticebar-sticky-banner-block'),
          value: animation,
          options: [{
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('None', 'noticebar-sticky-banner-block'),
            value: 'none'
          }, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Fade', 'noticebar-sticky-banner-block'),
            value: 'fade'
          }, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Slide', 'noticebar-sticky-banner-block'),
            value: 'slide'
          }],
          onChange: value => setAttributes({
            animation: value
          })
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.PanelBody, {
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Layout', 'noticebar-sticky-banner-block'),
        initialOpen: false,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.SelectControl, {
          __nextHasNoMarginBottom: true,
          __next40pxDefaultSize: true,
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Content alignment', 'noticebar-sticky-banner-block'),
          value: contentJustification,
          options: [{
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Left', 'noticebar-sticky-banner-block'),
            value: 'left'
          }, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Center', 'noticebar-sticky-banner-block'),
            value: 'center'
          }, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Right', 'noticebar-sticky-banner-block'),
            value: 'right'
          }, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Space between', 'noticebar-sticky-banner-block'),
            value: 'space-between'
          }],
          onChange: value => setAttributes({
            contentJustification: value
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.RangeControl, {
          __nextHasNoMarginBottom: true,
          __next40pxDefaultSize: true,
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Gap (px)', 'noticebar-sticky-banner-block'),
          value: gap,
          min: 0,
          max: 80,
          onChange: value => setAttributes({
            gap: value ?? 16
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.RangeControl, {
          __nextHasNoMarginBottom: true,
          __next40pxDefaultSize: true,
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Content max width (px)', 'noticebar-sticky-banner-block'),
          help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Set to 0 to use the full width.', 'noticebar-sticky-banner-block'),
          value: contentMaxWidth,
          min: 0,
          max: 1920,
          step: 10,
          onChange: value => setAttributes({
            contentMaxWidth: value ?? 0
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.ToggleControl, {
          __nextHasNoMarginBottom: true,
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Stack on mobile', 'noticebar-sticky-banner-block'),
          checked: stackOnMobile,
          onChange: value => setAttributes({
            stackOnMobile: value
          })
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.PanelBody, {
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Call to action', 'noticebar-sticky-banner-block'),
        initialOpen: false,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.ToggleControl, {
          __nextHasNoMarginBottom: true,
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Show button', 'noticebar-sticky-banner-block'),
          checked: showCta,
          onChange: value => setAttributes({
            showCta: value
          })
        }), showCta && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.Fragment, {
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("p", {
            className: "sbb-help",
            children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Edit the button text directly in the bar.', 'noticebar-sticky-banner-block')
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
            className: "sbb-url-control",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.URLInput, {
              __nextHasNoMarginBottom: true,
              label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('URL', 'noticebar-sticky-banner-block'),
              value: ctaUrl,
              onChange: value => setAttributes({
                ctaUrl: value
              })
            })
          }), !ctaUrl && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Notice, {
            status: "warning",
            isDismissible: false,
            children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Add a URL to display the button on your site.', 'noticebar-sticky-banner-block')
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.ToggleControl, {
            __nextHasNoMarginBottom: true,
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Open in new tab', 'noticebar-sticky-banner-block'),
            checked: ctaNewTab,
            onChange: value => setAttributes({
              ctaNewTab: value
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.RangeControl, {
            __nextHasNoMarginBottom: true,
            __next40pxDefaultSize: true,
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Border radius (px)', 'noticebar-sticky-banner-block'),
            value: ctaBorderRadius,
            min: 0,
            max: 999,
            onChange: value => setAttributes({
              ctaBorderRadius: value ?? 4
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.RangeControl, {
            __nextHasNoMarginBottom: true,
            __next40pxDefaultSize: true,
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Vertical padding (px)', 'noticebar-sticky-banner-block'),
            value: ctaPaddingY,
            min: 0,
            max: 40,
            onChange: value => setAttributes({
              ctaPaddingY: value ?? 8
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.RangeControl, {
            __nextHasNoMarginBottom: true,
            __next40pxDefaultSize: true,
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Horizontal padding (px)', 'noticebar-sticky-banner-block'),
            value: ctaPaddingX,
            min: 0,
            max: 80,
            onChange: value => setAttributes({
              ctaPaddingX: value ?? 16
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.FontSizePicker, {
            __next40pxDefaultSize: true,
            value: ctaFontSize || undefined,
            onChange: value => setAttributes({
              ctaFontSize: value ? String(value) : ''
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.SelectControl, {
            __nextHasNoMarginBottom: true,
            __next40pxDefaultSize: true,
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Font weight', 'noticebar-sticky-banner-block'),
            value: ctaFontWeight,
            options: FONT_WEIGHTS,
            onChange: value => setAttributes({
              ctaFontWeight: value
            })
          })]
        })]
      }), showCta && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.PanelColorSettings, {
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Button colors', 'noticebar-sticky-banner-block'),
        initialOpen: false,
        colorSettings: [{
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Background', 'noticebar-sticky-banner-block'),
          value: ctaBackgroundColor,
          onChange: value => setAttributes({
            ctaBackgroundColor: value || ''
          })
        }, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Text', 'noticebar-sticky-banner-block'),
          value: ctaTextColor,
          onChange: value => setAttributes({
            ctaTextColor: value || ''
          })
        }]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.PanelBody, {
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Close button', 'noticebar-sticky-banner-block'),
        initialOpen: false,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.ToggleControl, {
          __nextHasNoMarginBottom: true,
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Show close button', 'noticebar-sticky-banner-block'),
          checked: showClose,
          onChange: value => setAttributes({
            showClose: value
          })
        }), showClose && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.Fragment, {
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.RangeControl, {
            __nextHasNoMarginBottom: true,
            __next40pxDefaultSize: true,
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Icon size (px)', 'noticebar-sticky-banner-block'),
            value: closeIconSize,
            min: 12,
            max: 48,
            onChange: value => setAttributes({
              closeIconSize: value ?? 20
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.SelectControl, {
            __nextHasNoMarginBottom: true,
            __next40pxDefaultSize: true,
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('After closing', 'noticebar-sticky-banner-block'),
            value: dismissMemory,
            options: [{
              label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Show again on next page load', 'noticebar-sticky-banner-block'),
              value: 'none'
            }, {
              label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Keep hidden for the browser session', 'noticebar-sticky-banner-block'),
              value: 'session'
            }, {
              label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Keep hidden on this device', 'noticebar-sticky-banner-block'),
              value: 'local'
            }],
            onChange: value => setAttributes({
              dismissMemory: value
            })
          })]
        })]
      }), showClose && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.PanelColorSettings, {
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Close icon color', 'noticebar-sticky-banner-block'),
        initialOpen: false,
        colorSettings: [{
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Icon', 'noticebar-sticky-banner-block'),
          value: closeIconColor,
          onChange: value => setAttributes({
            closeIconColor: value || ''
          })
        }]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.PanelBody, {
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Visibility', 'noticebar-sticky-banner-block'),
        initialOpen: false,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.ToggleControl, {
          __nextHasNoMarginBottom: true,
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Hide on desktop', 'noticebar-sticky-banner-block'),
          help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Screens wider than 1024px.', 'noticebar-sticky-banner-block'),
          checked: hideOnDesktop,
          onChange: value => setAttributes({
            hideOnDesktop: value
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.ToggleControl, {
          __nextHasNoMarginBottom: true,
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Hide on tablet', 'noticebar-sticky-banner-block'),
          help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Screens 600px–1024px wide.', 'noticebar-sticky-banner-block'),
          checked: hideOnTablet,
          onChange: value => setAttributes({
            hideOnTablet: value
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.ToggleControl, {
          __nextHasNoMarginBottom: true,
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Hide on mobile', 'noticebar-sticky-banner-block'),
          help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Screens narrower than 600px.', 'noticebar-sticky-banner-block'),
          checked: hideOnMobile,
          onChange: value => setAttributes({
            hideOnMobile: value
          })
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.PanelBody, {
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Accessibility', 'noticebar-sticky-banner-block'),
        initialOpen: false,
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.TextControl, {
          __nextHasNoMarginBottom: true,
          __next40pxDefaultSize: true,
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Region label', 'noticebar-sticky-banner-block'),
          help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Announced by screen readers. Defaults to “Announcement”.', 'noticebar-sticky-banner-block'),
          value: ariaLabel,
          onChange: value => setAttributes({
            ariaLabel: value
          })
        })
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
      ...blockProps,
      children: [isSelected && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("span", {
        className: "sbb-editor-badge",
        children: badge
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
        className: "sbb-inner",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
          ...innerBlocksProps
        }), showCta && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("span", {
          className: "sbb-cta",
          style: ctaStyle,
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.RichText, {
            tagName: "span",
            "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Button text', 'noticebar-sticky-banner-block'),
            placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Add text…', 'noticebar-sticky-banner-block'),
            value: ctaText,
            onChange: value => setAttributes({
              ctaText: value
            }),
            allowedFormats: [],
            withoutInteractiveFormatting: true
          })
        })]
      }), showClose && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("span", {
        className: "sbb-close",
        "aria-hidden": "true",
        style: closeIconColor ? {
          color: closeIconColor
        } : undefined,
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_close_icon__WEBPACK_IMPORTED_MODULE_5__["default"], {
          size: closeIconSize
        })
      })]
    })]
  });
}

/***/ },

/***/ "./src/sticky-bar/icon.js"
/*!********************************!*\
  !*** ./src/sticky-bar/icon.js ***!
  \********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);
/**
 * Block icon: a page with a highlighted bar across the top.
 */


const icon = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__.SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__.Path, {
    d: "M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2Zm.5 16a.5.5 0 0 1-.5.5H5a.5.5 0 0 1-.5-.5V9.5h15V19Z"
  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__.Rect, {
    x: "6",
    y: "12",
    width: "8",
    height: "1.5",
    rx: ".75"
  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__.Rect, {
    x: "6",
    y: "15",
    width: "12",
    height: "1.5",
    rx: ".75"
  })]
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (icon);

/***/ },

/***/ "./src/sticky-bar/index.js"
/*!*********************************!*\
  !*** ./src/sticky-bar/index.js ***!
  \*********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style.scss */ "./src/sticky-bar/style.scss");
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./editor.scss */ "./src/sticky-bar/editor.scss");
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./block.json */ "./src/sticky-bar/block.json");
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./edit */ "./src/sticky-bar/edit.js");
/* harmony import */ var _save__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./save */ "./src/sticky-bar/save.js");
/* harmony import */ var _icon__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./icon */ "./src/sticky-bar/icon.js");
/* harmony import */ var _variations__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./variations */ "./src/sticky-bar/variations.js");
/**
 * Sticky Bar block registration.
 */








(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)(_block_json__WEBPACK_IMPORTED_MODULE_3__.name, {
  icon: _icon__WEBPACK_IMPORTED_MODULE_6__["default"],
  edit: _edit__WEBPACK_IMPORTED_MODULE_4__["default"],
  save: _save__WEBPACK_IMPORTED_MODULE_5__["default"],
  variations: _variations__WEBPACK_IMPORTED_MODULE_7__["default"]
});

/***/ },

/***/ "./src/sticky-bar/save.js"
/*!********************************!*\
  !*** ./src/sticky-bar/save.js ***!
  \********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ save)
/* harmony export */ });
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);
/**
 * Hybrid block: only the nested content (InnerBlocks) is saved to post
 * content. The bar wrapper, CTA and close button are rendered in PHP
 * (render.php) so output is escaped server-side and the markup can evolve
 * without block validation errors.
 */


function save() {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__.InnerBlocks.Content, {});
}

/***/ },

/***/ "./src/sticky-bar/variations.js"
/*!**************************************!*\
  !*** ./src/sticky-bar/variations.js ***!
  \**************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/**
 * Starter presets, registered as block variations so they appear in the
 * inserter and can be switched from the block sidebar.
 */

const variations = [{
  name: 'announcement',
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Announcement Bar', 'noticebar-sticky-banner-block'),
  description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('A sticky bar for news and announcements.', 'noticebar-sticky-banner-block'),
  isDefault: true,
  scope: ['inserter', 'transform'],
  attributes: {
    preset: 'announcement',
    position: 'top',
    ctaText: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Learn More', 'noticebar-sticky-banner-block'),
    ctaBackgroundColor: '#ffffff',
    ctaTextColor: '#1d4ed8',
    style: {
      color: {
        background: '#1d4ed8',
        text: '#ffffff'
      }
    }
  },
  innerBlocks: [['core/paragraph', {
    content: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('📢 We just launched something new!', 'noticebar-sticky-banner-block')
  }]]
}, {
  name: 'promotion',
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Promotion Bar', 'noticebar-sticky-banner-block'),
  description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Highlight a sale or limited-time offer.', 'noticebar-sticky-banner-block'),
  scope: ['inserter', 'transform'],
  attributes: {
    preset: 'promotion',
    position: 'top',
    ctaText: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Shop Now', 'noticebar-sticky-banner-block'),
    ctaBackgroundColor: '#ffffff',
    ctaTextColor: '#b91c1c',
    ctaFontWeight: '700',
    style: {
      color: {
        gradient: 'linear-gradient(90deg, #b91c1c 0%, #c2410c 100%)',
        text: '#ffffff'
      }
    }
  },
  innerBlocks: [['core/paragraph', {
    content: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('🔥 Get 30% Off — Limited Time', 'noticebar-sticky-banner-block')
  }]]
}, {
  name: 'cta',
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('CTA Bar', 'noticebar-sticky-banner-block'),
  description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Drive visitors to a single call to action.', 'noticebar-sticky-banner-block'),
  scope: ['inserter', 'transform'],
  attributes: {
    preset: 'cta',
    position: 'bottom',
    ctaText: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Get Started', 'noticebar-sticky-banner-block'),
    ctaBackgroundColor: '#facc15',
    ctaTextColor: '#111827',
    ctaBorderRadius: 999,
    ctaPaddingX: 20,
    style: {
      color: {
        background: '#111827',
        text: '#ffffff'
      }
    }
  },
  innerBlocks: [['core/paragraph', {
    content: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('🚀 Build Faster with Gutenberg', 'noticebar-sticky-banner-block')
  }]]
}, {
  name: 'free-shipping',
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Free Shipping Bar', 'noticebar-sticky-banner-block'),
  description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Let shoppers know about free shipping.', 'noticebar-sticky-banner-block'),
  scope: ['inserter', 'transform'],
  attributes: {
    preset: 'free-shipping',
    position: 'top',
    ctaText: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Shop Now', 'noticebar-sticky-banner-block'),
    ctaBackgroundColor: '#065f46',
    ctaTextColor: '#ffffff',
    style: {
      color: {
        background: '#ecfdf5',
        text: '#065f46'
      }
    }
  },
  innerBlocks: [['core/paragraph', {
    content: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('🚚 Free Shipping on Orders Over $50', 'noticebar-sticky-banner-block')
  }]]
}];
variations.forEach(variation => {
  variation.isActive = ['preset'];
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (variations);

/***/ },

/***/ "./src/sticky-bar/editor.scss"
/*!************************************!*\
  !*** ./src/sticky-bar/editor.scss ***!
  \************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ },

/***/ "./src/sticky-bar/style.scss"
/*!***********************************!*\
  !*** ./src/sticky-bar/style.scss ***!
  \***********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ },

/***/ "react/jsx-runtime"
/*!**********************************!*\
  !*** external "ReactJSXRuntime" ***!
  \**********************************/
(module) {

module.exports = window["ReactJSXRuntime"];

/***/ },

/***/ "@wordpress/block-editor"
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
(module) {

module.exports = window["wp"]["blockEditor"];

/***/ },

/***/ "@wordpress/blocks"
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
(module) {

module.exports = window["wp"]["blocks"];

/***/ },

/***/ "@wordpress/components"
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
(module) {

module.exports = window["wp"]["components"];

/***/ },

/***/ "@wordpress/data"
/*!******************************!*\
  !*** external ["wp","data"] ***!
  \******************************/
(module) {

module.exports = window["wp"]["data"];

/***/ },

/***/ "@wordpress/element"
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
(module) {

module.exports = window["wp"]["element"];

/***/ },

/***/ "@wordpress/i18n"
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
(module) {

module.exports = window["wp"]["i18n"];

/***/ },

/***/ "@wordpress/primitives"
/*!************************************!*\
  !*** external ["wp","primitives"] ***!
  \************************************/
(module) {

module.exports = window["wp"]["primitives"];

/***/ },

/***/ "./src/sticky-bar/block.json"
/*!***********************************!*\
  !*** ./src/sticky-bar/block.json ***!
  \***********************************/
(module) {

module.exports = /*#__PURE__*/JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"sticky-bar-block/sticky-bar","version":"1.0.1","title":"Sticky Bar","category":"design","description":"Create a sticky announcement, promotion, or call-to-action bar.","keywords":["announcement","notification","banner","promotion","cta"],"textdomain":"noticebar-sticky-banner-block","attributes":{"barId":{"type":"string","default":""},"preset":{"type":"string","default":""},"position":{"type":"string","enum":["top","bottom"],"default":"top"},"offset":{"type":"number","default":0},"zIndex":{"type":"number","default":999},"adminBarOffset":{"type":"boolean","default":true},"contentJustification":{"type":"string","enum":["left","center","right","space-between"],"default":"center"},"gap":{"type":"number","default":16},"contentMaxWidth":{"type":"number","default":0},"stackOnMobile":{"type":"boolean","default":true},"ariaLabel":{"type":"string","default":""},"showCta":{"type":"boolean","default":true},"ctaText":{"type":"string","default":""},"ctaUrl":{"type":"string","default":""},"ctaNewTab":{"type":"boolean","default":false},"ctaBackgroundColor":{"type":"string","default":""},"ctaTextColor":{"type":"string","default":""},"ctaBorderRadius":{"type":"number","default":4},"ctaPaddingY":{"type":"number","default":8},"ctaPaddingX":{"type":"number","default":16},"ctaFontSize":{"type":"string","default":""},"ctaFontWeight":{"type":"string","default":""},"showClose":{"type":"boolean","default":true},"closeIconSize":{"type":"number","default":20},"closeIconColor":{"type":"string","default":""},"dismissMemory":{"type":"string","enum":["none","session","local"],"default":"session"},"hideOnDesktop":{"type":"boolean","default":false},"hideOnTablet":{"type":"boolean","default":false},"hideOnMobile":{"type":"boolean","default":false},"animation":{"type":"string","enum":["none","fade","slide"],"default":"slide"}},"supports":{"html":false,"anchor":true,"color":{"background":true,"text":true,"link":true,"gradients":true,"__experimentalDefaultControls":{"background":true,"text":true}},"spacing":{"padding":true,"margin":true,"__experimentalDefaultControls":{"padding":true}},"typography":{"fontSize":true,"lineHeight":true,"textAlign":true,"__experimentalFontWeight":true,"__experimentalDefaultControls":{"fontSize":true}},"__experimentalBorder":{"color":true,"radius":true,"style":true,"width":true},"shadow":true},"editorScript":"file:./index.js","editorStyle":"file:./index.css","style":"file:./style-index.css","viewScript":"file:./view.js","render":"file:./render.php"}');

/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	const __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		const cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		const module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			const e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		const deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn) => {
/******/ 			if(chunkIds) {
/******/ 				deferred.push([chunkIds, fn]);
/******/ 				return;
/******/ 			}
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				let [chunkIds, fn] = deferred[i];
/******/ 				let fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if (__webpack_require__.O.j(chunkIds[j])) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					const r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = (module) => {
/******/ 		const getter = module && module.__esModule ?
/******/ 			() => (module['default']) :
/******/ 			() => (module);
/******/ 		__webpack_require__.d(getter, { a: getter });
/******/ 		return getter;
/******/ 	};
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	// define getter/value functions for harmony exports
/******/ 	__webpack_require__.d = (exports, definition) => {
/******/ 		for(var key in definition) {
/******/ 			if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 			}
/******/ 		}
/******/ 	};
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	__webpack_require__.o = (obj, prop) => (Object.hasOwn(obj, prop));
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = (exports) => {
/******/ 		Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		const installedChunks = {
/******/ 			"sticky-bar/index": 0,
/******/ 			"sticky-bar/style-index": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		const webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			let [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		const chunkLoadingGlobal = globalThis["webpackChunknoticebar_sticky_banner_block"] ||= [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	let __webpack_exports__ = __webpack_require__.O(undefined, ["sticky-bar/style-index"], () => (__webpack_require__("./src/sticky-bar/index.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map