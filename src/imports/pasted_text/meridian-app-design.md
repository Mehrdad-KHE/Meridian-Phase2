ما می‌خواهیم Meridian را به‌عنوان یک اپلیکیشن جدید طراحی کنیم، اما با منطق کاملاً مشخص.

Meridian یک برنامه local-first برای آماده‌سازی اسناد حسابداری است. هدف برنامه این است که کاربر اسناد مالی نامرتب خود را وارد کند، سیستم آن‌ها را بخواند، اسناد تکراری را تشخیص دهد، موارد ساده را خودکار دسته‌بندی کند، فقط موارد مبهم را برای Review نشان دهد، در صورت نیاز سوال از حسابدار بسازد، و در نهایت خروجی Excel / accountant review package / فرمت‌های قابل استفاده برای نرم‌افزارهای حسابداری تولید کند.

نکته مهم:
Meridian نباید شبیه یک داشبورد فنی باشد.
Meridian باید شبیه یک workflow assistant حسابداری باشد؛ مرحله‌به‌مرحله، قابل فهم، با دکمه‌های هوشمند و مسیر مشخص.

سبک کلی طراحی باید برای حسابدارها آشنا باشد و از اصطلاحات رایج در برنامه‌هایی مثل QuickBooks الهام بگیرد. منظور کپی کردن QuickBooks نیست؛ منظور این است که زبان، ساختار، و مفاهیم برای حسابدار و bookkeeper آشنا باشند.

اصطلاحات پیشنهادی:
Accountant / Firm
Client
Fiscal Year
Accounting Period
Chart of Accounts
Vendors
Expenses
Transactions
Review
Reconciliation
Export
Accountant Review Package

ساختار اصلی برنامه باید مرحله‌ای باشد، نه یک مجموعه صفحه آزاد و شلوغ.

گردش کار اصلی:

Accountant / Firm Setup
کاربر اول حسابدار یا firm حسابداری را تعریف یا انتخاب می‌کند.

اطلاعات ضروری باید خواسته شود، مثل:

Firm / Accountant name
Email
Phone
Address
Business / registration info if needed

اطلاعات غیرضروری باید optional باشد و صفحه را شلوغ نکند.

Client Setup
بعد از انتخاب firm، کاربر client را تعریف یا انتخاب می‌کند.

اطلاعات ضروری client باید واضح و استاندارد باشد:

Client name
Business type
Address
Email / phone
Business number if available

اگر استانداردهای کانادا برای business type یا آدرس قابل استفاده است، طراحی باید اجازه انتخاب استاندارد بدهد، ولی اگر کاربر لازم داشت، بتواند مقدار جدید هم تعریف کند.

اطلاعات optional باید جدا و کم‌مزاحمت باشد.

Period Setup
بعد از انتخاب client، کاربر دوره کاری را انتخاب می‌کند.

پیش‌فرض باید سال قبل باشد.
مثلاً اگر الان 2026 است، پیش‌فرض باید 2025 باشد.

پیش‌فرض دوره:
Annual / Full Year

اما کاربر باید بتواند دوره را تغییر دهد:

Annual
Quarterly
Semi-Annual
Monthly
Custom Period

سال باید dropdown باشد.
وقتی نوع period تغییر می‌کند، تاریخ شروع و پایان باید مطابق آن تنظیم شود.
اگر کاربر نیاز داشت، بتواند custom period تعریف کند.

Document Intake
بعد از انتخاب دوره، کاربر وارد صفحه ورود اسناد می‌شود.

در بالای صفحه باید یک نوار باریک context وجود داشته باشد که نشان دهد کاربر الان روی کدام مسیر کار می‌کند:

Accountant / Firm → Client → Period

مثلاً:
Northpeak Accounting → Daniel Roberts → 2025 Annual Period

این نوار باید باریک باشد و صفحه را شلوغ نکند.

در صفحه Documents، دکمه اصلی باید واضح باشد:

Upload Documents
یا
Select Folder / Add Files

وقتی کاربر فایل‌ها را انتخاب می‌کند، سیستم باید بلافاصله شروع به خواندن کند.

در این مرحله باید این اتفاق‌ها بیفتد:

فایل‌ها وارد شوند
fingerprint / hash گرفته شود
فایل تکراری از روی fingerprint یا محتوای داخلی تشخیص داده شود، نه فقط اسم فایل
OCR / extraction اجرا شود
سیستم تشخیص دهد فایل خوانده شد یا نه
اگر فایل مشکل داشت، لیبل واضح بگیرد
اگر فایل خوانده شد، با تیک واضح وارد لیست خوانده‌شده‌ها شود

وضعیت‌های ساده و قابل فهم:
Read
Needs Fix
Unreadable
Duplicate
Better Scan Detected
Re-upload Required
Included
On Hold
Excluded

اگر برنامه در حال خواندن فایل است، کاربر باید حتماً feedback ببیند:

progress bar
spinner
current file name
count مثل 12 of 80
status مثل Reading document / OCR running / Checking duplicates

تا وقتی یک عملیات در حال انجام است، دکمه‌های دیگر نباید بی‌دلیل قابل کلیک باشند. اگر دکمه‌ای غیرفعال است، باید دلیلش را کوتاه نشان دهد.

اگر فایل جدید شبیه یک فایل قبلی است، برنامه باید بر اساس fingerprint یا محتوای استخراج‌شده تشخیص دهد.
اگر فایل جدید نسخه بهتر یا اسکن واضح‌تر همان سند قبلی است، سیستم باید از کاربر بپرسد:

This looks like a better scan of an existing document. Replace previous version?

نه اینکه خودش بی‌اجازه جایگزین کند.

Processing
Processing نباید یک داشبورد شلوغ باشد.
Processing فقط باید نشان دهد سیستم دارد چه کاری انجام می‌دهد.

مراحل پیشنهادی:

Reading documents
Extracting text
Checking duplicates
Classifying documents
Matching to accounting categories
Preparing review items

در پایان Processing باید یک summary ساده بدهد:

X documents read successfully
X documents auto-classified
X documents need review
X documents unreadable
X duplicates found

بعد دکمه بعدی باید واضح باشد:
Go to Review
یا اگر چیزی برای review نیست:
Continue to Export

Review
Review فقط برای استثناهاست.

کاربر نباید مجبور شود همه اسناد را یکی‌یکی بررسی کند.
فقط چیزهایی که سیستم نتوانسته با اطمینان حل کند باید به Review بیاید.

Review باید موارد مشابه را گروه‌بندی کند:
مثلاً:

8 fuel receipts from same vendor
5 possible duplicate invoices
12 unclear scanner documents
3 documents needing accountant input

هر Review item باید واضح جواب دهد:

چرا اینجا آمده؟
سیستم چه پیشنهادی دارد؟
confidence چقدر است؟
چه evidence دارد؟
کاربر چه تصمیمی باید بگیرد؟

دکمه‌های Review باید استاندارد، کم، و واضح باشند:
Accept Recommendation
Mark as Support Only
Ask Accountant
Exclude from Accounting
Replace with Better Scan
Keep for Records

اگر گروه mixed است و نمی‌شود همه را با یک تصمیم حل کرد، باید split شود به زیرگروه‌های قابل تصمیم، نه اینکه یک گروه بزرگ و گیج‌کننده بسازد.

Accountant Q&A
اگر کاربر در Review نتوانست تصمیم بگیرد، باید بتواند آیتم یا گروه را برای سوال از حسابدار بفرستد.

Accountant Q&A نباید decision screen باشد.
فقط باید evidence request باشد.

این صفحه باید نشان دهد:

سوال چیست؟
مربوط به کدام سند یا گروه است؟
وضعیت: Awaiting Answer / Answered / Cancelled
جواب حسابدار چیست؟
دکمه Return to Review

وقتی جواب حسابدار ثبت شد، سیستم باید جواب را به چرخه برگرداند.
یعنی دوباره آن سند یا گروه را در Review نشان دهد، اما حالا با evidence جدید.

جواب حسابدار نباید خودکار تصمیم نهایی شود.
تصمیم نهایی باید همچنان در Review انجام شود.

Reprocess / Reconcile
وقتی جواب حسابدار یا فایل جدید وارد شد، سیستم باید دوباره مدارک مرتبط را بررسی کند.

اگر اطلاعات جدید روی تصمیم‌های قبلی اثر دارد، سیستم باید آن‌ها را به‌روزرسانی کند.

اگر سند جدیدی وارد شد، فقط همان سندها یا موارد مرتبط دوباره وارد چرخه شوند، نه اینکه کل کار بی‌دلیل از اول تکرار شود.

Export
مرحله آخر Export است.

Export باید فقط وقتی جدی و primary شود که blockers حل شده باشند.

حالت‌های Export:
Ready
Needs Attention

اگر آماده نیست، دقیقاً بگوید چرا:

unresolved review items
unanswered accountant questions
unreadable documents
duplicate conflicts
missing required client/period information

اگر هنوز آماده نیست اما کاربر می‌خواهد خروجی موقت بگیرد، دکمه باید بگوید:
Download Draft Review Package

نه اینکه حس final export بدهد.

خروجی‌ها:

Excel summary for accountant
Document index
Review decision report
Accountant Q&A report
CSV / Excel-compatible files for accounting software
Optional software-specific format based on selected accounting platform

طراحی باید جایی داشته باشد که کاربر انتخاب کند خروجی برای چه مقصدی است:

Accountant review
Excel
QuickBooks-compatible format
Generic CSV
Other accounting software
System / Advanced
این بخش برای چیزهای فنی است و نباید در مسیر اصلی کاربر باشد.

اینجا قرار بگیرد:

Backup / Restore
OCR worker status
OCRmyPDF / Tesseract status
trace / debug
app version
advanced mappings
import/export system backup

این‌ها نباید روی صفحه اصلی، Workspace، Documents یا Review مزاحم کاربر شوند.

قانون‌های مهم طراحی:

هر صفحه فقط یک مسئولیت اصلی داشته باشد.

دکمه‌ها باید جای ثابت و قابل پیش‌بینی داشته باشند.

دکمه‌های اصلی مسیر بعدی بهتر است در پایین سمت راست یا محل ثابت consistent باشند.

دکمه‌های برگشت / اصلاح باید همیشه در جای قابل فهم باشند.

اگر پیش‌نیاز یک دکمه انجام نشده، دکمه باید disabled باشد و دلیلش را کوتاه بگوید.

هر عملیاتی که زمان می‌برد باید feedback واضح داشته باشد:
progress bar، spinner، current file، یا step indicator.

اعلان‌ها نباید صفحه را بهم بریزند.
از toast یا inline status کوچک استفاده شود.

متن‌های صفحه باید کوتاه باشند.
نه وراجی، نه مبهم.

رنگ دکمه‌ها باید معنی داشته باشد:
Primary action = آبی یا رنگ اصلی
Safe/complete = سبز
Warning/needs attention = زرد/نارنجی
Danger/delete/exclude = قرمز
Secondary/back/details = خاکستری یا neutral

هدف نهایی تجربه کاربر:

کاربر باید حس کند:
من حسابدار/client/period را انتخاب می‌کنم، فایل‌ها را می‌ریزم داخل سیستم، Meridian خودش می‌خواند و مرتب می‌کند، فقط مواردی را که واقعاً نیاز به تصمیم دارد از من می‌پرسد، و در آخر خروجی مناسب برای حسابدار یا نرم‌افزار حسابداری آماده می‌کند.

لطفاً بر اساس این توضیح، این خروجی‌ها را طراحی کن:

workflow map کامل
step-by-step user journey
navigation model
screen responsibility map
wireframe برای صفحه‌های:
Accountant / Firm Setup
Client Setup
Period Setup
Documents Intake
Processing
Review
Accountant Q&A
Export
System / Advanced
جای دکمه‌های اصلی و secondary
نام دکمه‌ها و labelهای پیشنهادی
وضعیت‌های disabled / loading / completed / needs attention
اینکه چه چیزهایی باید hidden under Advanced باشند
نکات اجرایی برای Codex تا بعداً همین frontend را پیاده‌سازی کند

طراحی باید مینیمال، تیره، آرام، حرفه‌ای، قابل فهم برای حسابدار، و شبیه یک accounting workflow assistant باشد.
