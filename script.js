// تحميل مكتبة marked (متاحة عالمياً)
// دالة لتحميل وعرض ملف Markdown
async function loadMarkdown(filePath) {
    const contentDiv = document.getElementById('content-area');
    if (!contentDiv) return;
    contentDiv.innerHTML = '<div style="text-align:center;">⏳ جاري تحميل المحتوى...</div>';
    try {
        const response = await fetch(filePath);
        if (!response.ok) throw new Error('الملف غير موجود');
        const markdown = await response.text();
        // استخدام marked لتحويل Markdown إلى HTML
        const html = marked.parse(markdown);
        contentDiv.innerHTML = html;
        // تغيير عنوان الصفحة قليلاً
        document.querySelector('title').innerText = '📖 معاينة المحتوى - English Zone KSA';
    } catch (error) {
        contentDiv.innerHTML = '<p style="color: #fbbf24; text-align:center;">❌ لا يمكن تحميل المحتوى. تأكد من وجود الملف.</p>';
    }
}

// عندما يتم تحميل الصفحة بالكامل، نضبط الروابط
document.addEventListener('DOMContentLoaded', () => {
    // نختار جميع العناصر التي تحمل class="book-link" ونضيف لها حدث النقر
    const links = document.querySelectorAll('.book-link');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const filePath = link.getAttribute('data-path');
            if (filePath) {
                loadMarkdown(filePath);
            } else {
                console.warn('لا يوجد مسار للملف');
            }
        });
    });
});
