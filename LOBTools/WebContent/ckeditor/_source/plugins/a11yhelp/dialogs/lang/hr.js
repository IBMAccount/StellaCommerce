/**
 * @license Copyright (c) 2003-2014, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/licensePortions Copyright IBM Corp., 2009-2015.
 */

CKEDITOR.plugins.setLang( 'a11yhelp', 'hr',
{
	//do not translate anything with the form ${xxx} 
	
	title : "Pomoć",
	contents : "Sadržaj pomoći. Za zatvaranje dijaloga, pritisnite ESC.",
	legend :
	[
		{
			name : "Upute dostupnosti",
			items :
			[
				{
					name : "Traka s alatima urednika",
					legend: "Pritisnite ${toolbarFocus} da biste otišli na traku s alatima. " +
						"Premjestite u sljedeću ili prethodnu grupu trake s alatima s TAB ili SHIFT+TAB. " +
						"Premjestite se na sljedeći i prethodni gumb trake s alatima sa STRELICOM DESNO ili STRELICOM LIJEVO. " +
						"Pritisnite SPACE ili ENTER da biste aktivirali gumb trake s alatima."
				},

				{
					name: "Dijalog urednika",
					legend:
						"Unutar dijaloga, pritisnite TAB za odlazak na sljedeći element dijaloga, pritisnite SHIFT+TAB za pomak na prethodni element dijaloga, pritisnite ENTER za predavanje dijaloga na izvođenje, pritisnite ESC za opoziv dijaloga. " +
						"Kada dijalog ima više kartica, listu kartica možete dohvatiti ili s ALT+F10 ili s TAB ako je dio redoslijeda tabulatora u dijalogu. " +
						"Kada je lista kartica u fokusu, pomaknite se na sljedeću ili prethodnu karticu s DESNOM ili LIJEVOM STRELICOM, redom."
				},

				{
					name : "Kontekstni izbornik urednika",
					legend :
						"Pritisnite ${contextMenu} ili APPLICATION KEY da biste otvorili kontekstni izbornik. " +
						"Zatim se premjestite na sljedeću opciju izbornika s TAB ili STRELICOM DOLJE. " +
						"Premjestite se na prethodnu opciju sa SHIFT+TAB ili STRELICOM GORE. " +
						"Pritisnite RAZMAK ili ENTER da biste izabrali opciju izbornika. " +
						"Otvorite podizbornik trenutne opcije s RAZMAKOM ili ENTER ili STRELICOM DOLJE. " +
						"Vratite se na nadređenu stavku izbornika s ESC ili STRELICOM LIJEVO. " +
						"Zatvorite kontekstni izbornik s ESC."
				},

				{
					name : "Kućica s popisom urednika",
					legend :
						"Unutar kućice s popisom premjestite se na sljedeći stavku popisa s TAB ili STRELICOM DOLJE. " +
						"Premjestite se na prethodnu stavku popisa sa SHIFT + TAB ili STRELICOM GORE. " +
						"Pritisnite RAZMAK ili ENTER da biste izabrali opciju popisa. " +
						"Pritisnite ESC da biste zatvorili kućicu s popisom."
				},

				{
					name : "Traka staze elementa urednika (ako je dostupno*)",
					legend :
						"Pritisnite ${elementsPathFocus} da biste otišli na traku staze elemenata. " +
						"Premjestite se na sljedeći gumb s TAB ili STRELICOM DESNO. " +
						"Premjestite se na prethodni gumb sa SHIFT+TAB ili STRELICOM LIJEVO. " +
						"Pritisnite RAZMAK ili ENTER da biste izabrali element u uredniku."
				}
			]
		},
		{
			name : "Naredbe",
			items :
			[
				{
					name : " Naredba poništavanja",
					legend : "Pritisnite ${undo}"
				},
				{
					name : " Naredba ponovnog stvaranja",
					legend : "Pritisnite ${redo}"
				},
				{
					name : " Naredba podebljavanja",
					legend : "Pritisnite ${bold}"
				},
				{
					name : " Naredba za kurziv",
					legend : "Pritisnite ${italic}"
				},
				{
					name : " Naredba za podcrtavanje",
					legend : "Pritisnite ${underline}"
				},
				{
					name : " Naredba za vezu",
					legend : "Pritisnite ${link}"
				},
				{
					name : " Naredba skupljanja na traci s alatima (ako je dostupna*)",
					legend : "Pritisnite ${toolbarCollapse}"
				},
				{
					name: ' Naredba za pristupanje prethodnom prostoru fokusa',
					legend: 'Pritisnite ${accessPreviousSpace} za umetanje razmaka u nedostupni fokus prostor izravno ispred kursora. ' +
						'Nedostupan fokus prostor je lokacija u uredniku na koju ne možete postaviti kursor ' + 
						'pomoću miša ili tipkovnice. Na primjer: koristite ovu naredbu za umetanje sadržaja između dva susjedna elementa tablice.'
				},
				{
					name: ' Naredba za pristupanje sljedećem prostoru fokusa',
					legend: 'Pritisnite ${accessNextSpace} za umetanje razmaka u nedostupni fokus prostor izravno nakon kursora. ' +
						'Nedostupan fokus prostor je lokacija u uredniku na koju ne možete postaviti kursor ' +
						'pomoću miša ili tipkovnice. Na primjer: koristite ovu naredbu za umetanje sadržaja između dva susjedna elementa tablice.'
				},
				{
					name : " Povećaj uvlačenje",
					legend : "Pritisnite ${indent}"
				},
				{
					name : " Smanji uvlačenje",
					legend : "Pritisnite ${outdent}"
				},				
				{
					name : " Smjer teksta s lijeva na desno",
					legend : "Pritisnite ${bidiltr}"
				},
				{
					name : " Smjer teksta s desna na lijevo",
					legend : "Pritisnite ${bidirtl}"
				},
				{
					name: ' Trajna olovka',
					legend: 'Pritisnite ${ibmpermanentpen} (Alt+Cmd+T na MAC-u) unutar editora da aktivirate/deaktivirate trajnu olovku.'
				},
				{
					name : " Pomoć za dostupnost",
					legend : "Pritisnite ${a11yHelp}"
				}
			]
		},
		
		{	//added by ibm
			name : "Napomena",
			items :
			[
				{	
					name : "",
					legend : "* Neke funkcije može onemogućiti administrator."
				}
			]
		}
	],
	backspace: 'Pomak unatrag',
	tab: 'Kartica',
	enter: 'Enter',
	shift: 'Smjena',
	ctrl: 'Ctrl',
	alt: 'Alt',
	pause: 'Pauza',
	capslock: 'Caps Lock',
	escape: 'Escape',
	pageUp: 'Page Up',
	pageDown: 'Page Down',
	end: 'Kraj',
	home: 'Početna stranica',
	leftArrow: 'Strelica lijevo',
	upArrow: 'Strelica gore',
	rightArrow: 'Strelica desno',
	downArrow: 'Strelica dolje',
	insert: 'Umetni',
	'delete': 'Brisanje',
	leftWindowKey: 'Lijeva Windows tipka',
	rightWindowKey: 'Desna Windows tipka',
	selectKey: 'Select tipka',
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
	multiply: 'Množenje',
	add: 'Dodaj',
	subtract: 'Oduzimanje',
	decimalPoint: 'Decimalni zarez',
	divide: 'Dijeljenje',
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
	numLock: 'Num Lock',
	scrollLock: 'Scroll Lock',
	semiColon: 'Točka-zarez',
	equalSign: 'Znak jednakosti',
	comma: 'Zarez',
	dash: 'Crtica',
	period: 'Period',
	forwardSlash: 'Kosa crta',
	graveAccent: 'Grave Accent',
	openBracket: 'Otvorena zagrada',
	backSlash: 'Obrnuta kosa crta',
	closeBracket: 'Zatvorena zagrada',
	singleQuote: 'Jednostruki navodnik',
	
	ibm :
	{
		helpLinkDescription : "Otvorite više poglavlja pomoći u novom prozoru",
		helpLink : "Još poglavlja pomoći"
	}

});

