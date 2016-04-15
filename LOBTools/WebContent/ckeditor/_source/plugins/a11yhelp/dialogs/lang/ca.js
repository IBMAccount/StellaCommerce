/**
 * @license Copyright (c) 2003-2014, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/licensePortions Copyright IBM Corp., 2009-2015.
 */

CKEDITOR.plugins.setLang( 'a11yhelp', 'ca',
{
	//do not translate anything with the form ${xxx} 
	
	title : "Ajuda",
	contents : "Contingut de l\'ajuda. Pitgeu ESC per tancar aquest diàleg.",
	legend :
	[
		{
			name : "Instruccions d\'accessibilitat",
			items :
			[
				{
					name : "Barra d\'eines de l\'editor",
					legend: "Premeu ${toolbarFocus} per navegar per la barra d'eines. " +
						"Aneu al següent grup i a l'anterior de la barra d'eines amb TABULADOR i MAJÚSCULES-TABULADOR. " +
						"Aneu al següent botó i a l'anterior de la barra d'eines amb FLETXA DRETA o la FLETXA ESQUERRA. " +
						"Premeu ESPAI o INTRO per activar el botó de la barra d'eines."
				},

				{
					name: "Diàleg de l\'editor",
					legend:
						"Dins d'un diàleg, premeu TABULADOR per anar al següent element de diàleg, premeu MAJÚSCULES+TABULADOR per anar a l'element de diàleg anterior, premeu INTRO per enviar el diàleg o premeu ESC per cancel·lar el diàleg. " +
						"Si un diàleg té diverses pestanyes, podeu anar a la llista de pestanyes amb ALT+F10 o amb TABULADOR com a part de l'ordre de pestanyes del diàleg. " +
						"Amb el focus a la llista de pestanyes, aneu a la pestanya següent o anterior amb FLETXA DRETA i FLETXA ESQUERRA, respectivament. "
				},

				{
					name : "Menú contextual de l\'editor",
					legend :
						"Premeu ${contextMenu} o CLAU D'APLICACIÓ per obrir el menú contextual. " +
						"A continuació, aneu a la següent opció de menú amb TABULADOR o FLETXA AVALL. " +
						"Mou a opció anterior amb les tecles MAJÚS+TABULADOR o FLETXA AMUNT. " +
						"Premeu ESPAI o INTRO per seleccionar l'opció de menú. " +
						"Obre un submenú de l'opció actual amb ESPAI o INTRO o FLETXA DRETA. " +
						"Torneu enrere a l'element del menú principal amb ESC o la FLETXA ESQUERRA. " +
						"Tanqueu el menú contextual amb ESC."
				},

				{
					name : "Quadre de llista de l\'editor",
					legend :
						"Dins un quadre de llista, passeu al següent ítem de la llista amb TABULADOR o FLETXA CAP AVALL. " +
						"Passeu a l'element de la llista anterior amb MAJÚS+TABULADOR o la FLETXA ESQUERRA. " +
						"Premeu ESPAI o INTRO per seleccionar l'opció de llista. " +
						"Premeu ESC per tancar el quadre de llista."
				},

				{
					name : "Barra de camí d'accés d'elements de l'editor (si està disponible*)",
					legend :
						"Premeu ${elementsPathFocus} per navegar a la barra de camí d'accés dels elements. " +
						"Passeu al següent botó d'element amb TABULADOR o FLETXA DRETA. " +
						"Passeu al botó anterior a amb MAJÚS+TABULADOR o FLETXA ESQUERRA. " +
						"Premeu ESPAI o INTRO per seleccionar l'element o a l'editor."
				}
			]
		},
		{
			name : "Ordres",
			items :
			[
				{
					name : " Desfés l\'ordre",
					legend : "Premeu ${undo}"
				},
				{
					name : " Refés l\'ordre",
					legend : "Premeu ${redo}"
				},
				{
					name : " Ordre de negreta",
					legend : "Premeu ${bold}"
				},
				{
					name : " Ordre de cursiva",
					legend : "Premeu ${italic}"
				},
				{
					name : " Ordre de subratllat",
					legend : "Premeu ${underline}"
				},
				{
					name : " Ordre d\'enllaç",
					legend : "Premeu ${link}"
				},
				{
					name : " Ordre per reduir la barra d'eines (si està disponible*)",
					legend : "Premeu ${toolbarCollapse}"
				},
				{
					name: ' Ordre d\'accedir a l\'espai de focus anterior',
					legend: 'Premeu ${accessPreviousSpace} per inserir un espai en un espai de focus inassolible directament abans del cursor. ' +
						'Un espai de focus inassolible és una ubicació a l\'editor on es pot situar el cursor ' + 
						'mitjançant el ratolí o el teclat. Per exemple: utilitzeu aquesta ordre per inserir contingut entre dos elements de taula adjacents:'
				},
				{
					name: ' Ordre d\'accedir a l\'espai de focus següent',
					legend: 'Premeu ${accessNextSpace} per inserir un espai en un espai de focus inassolible directament després del cursor. ' +
						'Un espai de focus inassolible és una ubicació a l\'editor on es pot situar el cursor ' +
						'mitjançant el ratolí o el teclat. Per exemple: utilitzeu aquesta ordre per inserir contingut entre dos elements de taula adjacents:'
				},
				{
					name : " Augmenta sagnat",
					legend : "Premeu ${indent}"
				},
				{
					name : " Disminueix sagnat",
					legend : "Premeu ${outdent}"
				},				
				{
					name : " Direcció de text d'esquerra a dreta",
					legend : "Premeu ${bidiltr}"
				},
				{
					name : " Direcció de text de dreta a esquerra",
					legend : "Premeu ${bidirtl}"
				},
				{
					name: ' Bolígraf permanent',
					legend: 'Premeu ${ibmpermanentpen} (Alt+Cmd+T al MAC) dins l\'editor per activar/desactivar el bolígraf permanent.'
				},
				{
					name : " Ajuda d\'accessibilitat",
					legend : "Premeu ${a11yHelp}"
				}
			]
		},
		
		{	//added by ibm
			name : "Nota",
			items :
			[
				{	
					name : "",
					legend : "* L'administrador pot haver inhabilitat algunes funcions."
				}
			]
		}
	],
	backspace: 'Retrocés',
	tab: 'Tabulador',
	enter: 'Tecla Intro',
	shift: 'Majús',
	ctrl: 'Ctrl',
	alt: 'Alt',
	pause: 'Pausa',
	capslock: 'Fixació de majúscules',
	escape: 'Esc',
	pageUp: 'Re Pàg',
	pageDown: 'Av Pàg.',
	end: 'Final',
	home: 'Inici',
	leftArrow: 'Fletxa esquerra',
	upArrow: 'Fletxa amunt',
	rightArrow: 'Fletxa dreta',
	downArrow: 'Fletxa avall',
	insert: 'Insereix',
	'delete': 'Suprimeix',
	leftWindowKey: 'clau Windows esquerra',
	rightWindowKey: 'clau Windows dreta',
	selectKey: 'Seleccioneu clau',
	numpad0: 'Numpad 0',
	numpad1: 'Numpad 1',
	numpad2: 'Numpad 2',
	numpad3: 'Numpad 3',
	numpad4: 'Numpad 4',
	numpad5: 'Numpad 5',
	numpad6: 'Numpad 6',
	numpad7: 'Numpad 7',
	numpad8: 'Numpad 8',
	numpad9: 'Numpad 9',
	multiply: 'Multiplica',
	add: 'Afegeix',
	subtract: 'Resta',
	decimalPoint: 'Coma decimal',
	divide: 'Divideix',
	f1: 'F1',
	f2: 'F2',
	f3: 'F3',
	f4: 'F4',
	f5: 'F5',
	f6: 'F6',
	f7: 'F7',
	f8: 'F8',
	f9: 'F9',
	f10: 'F10',
	f11: 'F11',
	f12: 'F12',
	numLock: 'Bloq Num',
	scrollLock: 'Bloq Despl',
	semiColon: 'Punt i coma',
	equalSign: 'Signe igual',
	comma: 'Coma',
	dash: 'Guió',
	period: 'Punt',
	forwardSlash: 'Barra inclinada',
	graveAccent: 'Accent obert',
	openBracket: 'Obrir parèntesi',
	backSlash: 'Barra invertida',
	closeBracket: 'Tancar parèntesi',
	singleQuote: 'Cometes simples',
	
	ibm :
	{
		helpLinkDescription : "Obra més temes de l'ajuda a una nova finestra",
		helpLink : "Més temes de l'ajuda"
	}

});

