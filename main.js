/**
 * Main JavaScript for هاف لوري أنوار الخليج
 * Phone: 55225082
 */

document.addEventListener('DOMContentLoaded', () => {
  const phoneNumber = '55225082';
  const whatsappNumber = '96555225082';

  // 1. Header scroll effect
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header?.classList.add('scrolled-header');
    } else {
      header?.classList.remove('scrolled-header');
    }
  });

  // 2. Mobile menu toggle
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
      mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
      mobileMenu.classList.toggle('hidden');
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // 3. Copy Phone Number with Toast notification
  const copyButtons = document.querySelectorAll('.btn-copy-phone');
  const toast = document.getElementById('toast');
  const toastText = document.getElementById('toastText');

  function showToast(message) {
    if (!toast) return;
    if (toastText) toastText.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }

  copyButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(phoneNumber).then(() => {
          showToast(`تم نسخ رقم الهاتف (${phoneNumber}) بنجاح`);
        }).catch(() => {
          fallbackCopyText(phoneNumber);
        });
      } else {
        fallbackCopyText(phoneNumber);
      }
    });
  });

  function fallbackCopyText(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      showToast(`تم نسخ رقم الهاتف (${text}) بنجاح`);
    } catch (err) {
      showToast(`رقم الهاتف للتواصل: ${text}`);
    }
    document.body.removeChild(textArea);
  }

  // 4. FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const header = item.querySelector('.faq-header');
    if (header) {
      header.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        // Close others
        faqItems.forEach(other => {
          if (other !== item) other.classList.remove('active');
        });
        // Toggle current
        item.classList.toggle('active', !isActive);
      });
    }
  });

  // 5. Quick Inquiry to WhatsApp Form
  const quickForm = document.getElementById('quickInquiryForm');
  if (quickForm) {
    quickForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const service = document.getElementById('formService')?.value || 'نقل عام';
      const fromArea = document.getElementById('formFromArea')?.value || 'غير محدد';
      const toArea = document.getElementById('formToArea')?.value || 'غير محدد';
      const notes = document.getElementById('formNotes')?.value || '';

      let textMessage = `مرحباً، أود الاستفسار عن خدمة هاف لوري أنوار الخليج:\n`;
      textMessage += `▪️ الخدمة المطلوبة: ${service}\n`;
      textMessage += `▪️ من منطقة: ${fromArea}\n`;
      textMessage += `▪️ إلى منطقة: ${toArea}\n`;
      if (notes.trim()) {
        textMessage += `▪️ تفاصيل إضافية: ${notes.trim()}\n`;
      }
      textMessage += `\nيرجى التواصل معي. شكراً لكم.`;

      const encodedMsg = encodeURIComponent(textMessage);
      const waUrl = `https://wa.me/${whatsappNumber}?text=${encodedMsg}`;
      window.open(waUrl, '_blank');
    });
  }

  // 6. Smooth scrolling for hash links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          const headerOffset = 80;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // 7. Update current year
  const yearElem = document.getElementById('currentYear');
  if (yearElem) {
    yearElem.textContent = new Date().getFullYear();
  }
});
