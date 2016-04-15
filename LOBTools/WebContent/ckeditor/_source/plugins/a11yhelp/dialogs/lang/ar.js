/**
 * @license Copyright (c) 2003-2014, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/licensePortions Copyright IBM Corp., 2009-2015.
 */

CKEDITOR.plugins.setLang( 'a11yhelp', 'ar',
{
	//do not translate anything with the form ${xxx} 
	
	title : "‏مساعدة‏",
	contents : "محتويات المساعدة.  لاغلاق هذا الحوار، اضغط ESC.",
	legend :
	[
		{
			name : "تعليمات امكانية التوصل",
			items :
			[
				{
					name : "خط أدوات برنامج التحرير",
					legend: "اضغط على ${toolbarFocus} للانتقال الى خط الأدوات. " +
						"انتقل الى الى مجموعة خط الأدوات السابقة والتالية باستخدام مفاتيح TAB و SHIFT+TAB. " +
						"الانتقال الى مفاتيح خط الأدوات التالية والسابقة باستخدام مفاتيح سهم يمين أو سهم يسار. " +
						"اضغط SPACE أو ENTER لتفعيل مفاتيح خط الأدوات."
				},

				{
					name: "حوار برنامج التحرير",
					legend:
						"داخل مربع حواري، اضغط TAB للتجول الى عنصر الحوار التالي، اضغط ‎SHIFT+TAB‎ لتنتقل الى عنصر الحوار التالي، اضغط ENTER لاحالة الحوار، اضغط ESC لالغاء الحوار. " +
						"عندما يكون هناك علامات تبويب متعددة بالحوار، يمكن التوصل الى كشف علامات التبويب اما بواسطة ALT+F10‎ أو بواسطة TAB كجزء من ترتيب الانتقال. " +
						"مع تحديد التركيز على كشف علامات التبويب، تنقل الى علامة التبويب التالية والسابقة باستخدام مفاتيح أسهم RIGHT و LEFT، بالتوالي."
				},

				{
					name : "القائمة السياقية لبرنامج التحرير",
					legend :
						"اضغط ${contextMenu} أو APPLICATION KEY لفتح القائمة السياقية. " +
						"ثم انتقل الى اختيار القائمة التالي باستخدام مفتاح TAB أو سهم لأسفل. " +
						"انتقل الى الاختيار السابق باستخدام المفاتيح SHIFT+TAB أو سهم لأعلى. " +
						"اضغط SPACE أو ENTER لتحديد اختيار القائمة. " +
						"قم بفتح القائمة الفرعية للاختيار الحالي باستخدام مفتاح SPACE أو ENTER أو سهم يمين. " +
						"ارجع الى بند القائمة الرئيسي باستخدام ESC أو سهم يسار. " +
						"اغلاق القائمة السياقية باستخدام مفتاح ESC."
				},

				{
					name : "مربع اختيار برنامج التحرير",
					legend :
						"داخل مربع الكشف، انتقل الى بند الكشف التالي باستخدام TAB أو السهم الأسفل. " +
						"انتقل الى بند الكشف السابق باستخدام SHIFT + TAB أو السهم لأعلى. " +
						"اضغط SPACE أو ENTER لتحديد اختيار الكشف. " +
						"اضغط ESC لاغلاق مربع الكشف."
				},

				{
					name : "خط مسار عنصر برنامج التحرير (اذا كان متاحا*)",
					legend :
						"اضغط ${elementsPathFocus} للانتقال الى خط مسار العناصر. " +
						"انتقل الى مفتاح العنصر التالي باستخدام مفتاح TAB أو RIGHT ARROW. " +
						"انتقل الى الاختيار السابق باستخدام المفاتيح SHIFT+TAB أو سهم يسار. " +
						"اضغط SPACE أو ENTER لتحديد العنصر في برنامج التحرير."
				}
			]
		},
		{
			name : "الأوامر",
			items :
			[
				{
					name : " الأمر تراجع",
					legend : "اضغط ${undo}"
				},
				{
					name : " الأمر اعادة تنفيذ",
					legend : "اضغط ${redo}"
				},
				{
					name : " الأمر عريض",
					legend : "اضغط ${bold}"
				},
				{
					name : " الأمر مائل",
					legend : "اضغط ${italic}"
				},
				{
					name : " الأمر تحته سطر",
					legend : "اضغط ${underline}"
				},
				{
					name : " الأمر وصلة",
					legend : "اضغط ${link}"
				},
				{
					name : " أمر طي خط الأدوات (اذا كان متاحا*)",
					legend : "اضغط ${toolbarCollapse}"
				},
				{
					name: ' أمر التوصل الى مساحة التركيز السابقة',
					legend: 'اضغط ${accessPreviousSpace} لادراج مساحة في مساحة تركيز تأثير لا يمكن الوصول لها مباشرة قبل المؤشر. ' +
						'مساحة تركيز التأثير التي لا يمكن الوصول اليها هي مكان في برنامج التحرير حيث لا يمكنك وضع المؤشر. ' + 
						'استخدام الفأرة أو لوحة المفاتيح. على سبيل المثال، استخدم هذا الأمر لادراج محتويات بين عنصري جدول متقاربين.'
				},
				{
					name: ' أمر التوصل الى مساحة التركيز التالية',
					legend: 'اضغط ${accessNextSpace} لادراج مساحة في مساحة تركيز تأثير لا يمكن الوصول لها مباشرة بعد  المؤشر. ' +
						'مساحة تركيز التأثير التي لا يمكن الوصول اليها هي مكان في برنامج التحرير حيث لا يمكنك وضع المؤشر. ' +
						'استخدام الفأرة أو لوحة المفاتيح. على سبيل المثال، استخدم هذا الأمر لادراج محتويات بين عنصري جدول متقاربين.'
				},
				{
					name : " زيادة الازاحة للداخل",
					legend : "اضغط ${indent}"
				},
				{
					name : " تقليل الازاحة للداخل",
					legend : "اضغط ${outdent}"
				},				
				{
					name : " اتجاه النص من اليسار الى اليمين",
					legend : "اضغط ${bidiltr}"
				},
				{
					name : " اتجاه النص من اليمين الى اليسار",
					legend : "اضغط ${bidirtl}"
				},
				{
					name: ' قلم دائم',
					legend: 'اضغط ${ibmpermanentpen} (Alt+Cmd+T على MAC) داخل برنامج التحرير لتفعيل/الغاء تفعيل القلم الدائم.'
				},
				{
					name : " مساعدة عن امكانية التوصل",
					legend : "اضغط ${a11yHelp}"
				}
			]
		},
		
		{	//added by ibm
			name : "ملحوظة",
			items :
			[
				{	
					name : "",
					legend : "* يمكن أن يتم الغاء اتاحة بعض الخصائص من خلال المسئول عن النظام."
				}
			]
		}
	],
	backspace: 'Backspace',
	tab: 'علامة التبويب',
	enter: 'Enter',
	shift: 'Shift',
	ctrl: 'Ctrl',
	alt: 'Alt',
	pause: '‏ايقاف-مؤقت‏',
	capslock: 'Caps Lock',
	escape: 'Escape',
	pageUp: 'Page Up',
	pageDown: 'Page Down',
	end: 'انهاء',
	home: 'الصفحة الرئيسية',
	leftArrow: 'سهم يسار',
	upArrow: 'سهم لأعلى',
	rightArrow: 'سهم يمين',
	downArrow: 'سهم لأسفل',
	insert: '‏ادراج‏',
	'delete': 'حذف',
	leftWindowKey: 'مفتاح النوافذ اليسرى',
	rightWindowKey: 'مفتاح النوافذ اليمنى',
	selectKey: 'حدد مفتاح',
	numpad0: 'اللوحة الرقمية 0',
	numpad1: 'اللوحة الرقمية 1',
	numpad2: 'اللوحة الرقمية 2',
	numpad3: 'اللوحة الرقمية 3',
	numpad4: 'اللوحة الرقمية 4',
	numpad5: 'اللوحة الرقمية 5',
	numpad6: 'اللوحة الرقمية 6',
	numpad7: 'اللوحة الرقمية 7',
	numpad8: 'اللوحة الرقمية 8',
	numpad9: 'اللوحة الرقمية 9',
	multiply: 'المضاعفة',
	add: 'اضافة',
	subtract: 'طرح',
	decimalPoint: 'علامة عشرية',
	divide: 'القسمة',
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
	semiColon: 'فاصلة منقوطة',
	equalSign: 'علامة يساوي',
	comma: 'فاصلة',
	dash: 'شرطة',
	period: 'نقطة',
	forwardSlash: 'شرطة مائلة',
	graveAccent: 'العلامة النطقية',
	openBracket: 'قوس فتح',
	backSlash: 'شرطة مائلة للخلف',
	closeBracket: 'قوس اغلاق',
	singleQuote: 'علامة اقتباس مفردة',
	
	ibm :
	{
		helpLinkDescription : "فتح المزيد من موضوعات المساعدة في نافذة جديدة",
		helpLink : "المزيد من موضوعات المساعدة"
	}

});

