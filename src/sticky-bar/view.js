/**
 * Sticky Bar — frontend behaviour.
 *
 * Only handles the close button: reveals it (it is `hidden` in the markup
 * so it never appears without JavaScript), dismisses the bar, and
 * optionally remembers the dismissal in session/local storage.
 */
( function () {
	const STORAGE_PREFIX = 'sticky-bar-block:dismissed:';

	const prefersReducedMotion = () =>
		window.matchMedia &&
		window.matchMedia( '(prefers-reduced-motion: reduce)' ).matches;

	const getStorage = ( type ) => {
		try {
			const storage =
				'local' === type ? window.localStorage : window.sessionStorage;
			const probe = STORAGE_PREFIX + 'probe';
			storage.setItem( probe, '1' );
			storage.removeItem( probe );
			return storage;
		} catch ( e ) {
			return null;
		}
	};

	// Small string hash so editing a bar's text shows it again.
	const hash = ( str ) => {
		let h = 5381;
		for ( let i = 0; i < str.length; i++ ) {
			h = ( ( h << 5 ) + h + str.charCodeAt( i ) ) | 0; // eslint-disable-line no-bitwise
		}
		return ( h >>> 0 ).toString( 36 ); // eslint-disable-line no-bitwise
	};

	const hide = ( bar ) => {
		bar.hidden = true;
		bar.classList.remove( 'sbb-is-dismissing' );
	};

	const init = ( bar ) => {
		const button = bar.querySelector( '.sbb-close' );
		if ( ! button ) {
			return;
		}

		const memory = bar.dataset.sbbMemory;
		const storage =
			'session' === memory || 'local' === memory
				? getStorage( memory )
				: null;
		const key =
			STORAGE_PREFIX +
			( bar.dataset.sbbId || '' ) +
			':' +
			hash( bar.textContent.trim() );

		if ( storage && '1' === storage.getItem( key ) ) {
			hide( bar );
			return;
		}

		const dismiss = () => {
			if ( storage ) {
				try {
					storage.setItem( key, '1' );
				} catch ( e ) {
					// Storage full or blocked: dismiss for this page view only.
				}
			}

			if (
				prefersReducedMotion() ||
				bar.classList.contains( 'sbb-animation-none' )
			) {
				hide( bar );
				return;
			}

			bar.classList.add( 'sbb-is-dismissing' );
			window.setTimeout( () => hide( bar ), 260 );
		};

		button.hidden = false;
		button.addEventListener( 'click', dismiss );

		// Escape closes the bar when focus is inside it.
		bar.addEventListener( 'keydown', ( event ) => {
			if ( 'Escape' === event.key ) {
				dismiss();
			}
		} );
	};

	const run = () => {
		document
			.querySelectorAll( '.wp-block-sticky-bar-block-sticky-bar' )
			.forEach( init );
	};

	if ( 'loading' === document.readyState ) {
		document.addEventListener( 'DOMContentLoaded', run );
	} else {
		run();
	}
} )();
