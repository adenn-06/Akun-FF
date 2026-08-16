document.addEventListener('DOMContentLoaded', function(){
  const waNumber = '6285161983346';
  const waMessage = encodeURIComponent('Halo Admin JB DENZZ STORE, saya ingin membeli akun FF/ML');
  const waBase = 'https://wa.me/' + waNumber + '?text=' + waMessage;

  const modal = document.getElementById('imgModal');
  const modalImg = document.getElementById('modalImg');
  const modalClose = document.getElementById('modalClose');

  function openModal(src, alt){
    modalImg.src = src;
    modalImg.alt = alt || 'Preview akun';
    modal.setAttribute('aria-hidden','false');
  }

  function closeModal(){
    modal.setAttribute('aria-hidden','true');
    modalImg.src = '';
    modalImg.alt = '';
  }

  document.querySelectorAll('.card-media').forEach(el => {
    el.style.cursor = 'zoom-in';
    el.addEventListener('click', () => {
      const large = el.getAttribute('data-large') || el.querySelector('img').src;
      openModal(large, el.querySelector('img').alt);
    });
  });

  modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => { if(e.target === modal) closeModal(); });
  document.addEventListener('keydown', (e) => { if(e.key === 'Escape') closeModal(); });
  
  // Product image preview (also for product media)
  document.querySelectorAll('.product-media, .card-media').forEach(el => {
    el.style.cursor = 'zoom-in';
    const btn = el.closest('.product-card')?.querySelector('.view-img');
    if(btn){ btn.addEventListener('click', () => { const large = el.getAttribute('data-large') || el.querySelector('img').src; openModal(large, el.querySelector('img').alt); }); }
    el.addEventListener('click', () => { const large = el.getAttribute('data-large') || el.querySelector('img').src; openModal(large, el.querySelector('img').alt); });
  });

  // Purchase modal
  const purchaseModal = document.getElementById('purchaseModal');
  const purchaseClose = document.getElementById('purchaseClose');
  const purchaseForm = document.getElementById('purchaseForm');
  const selectedAccount = document.getElementById('selectedAccount');
  const cancelPurchase = document.getElementById('cancelPurchase');

  function openPurchase(accountName){
    selectedAccount.value = accountName || '';
    purchaseModal.setAttribute('aria-hidden','false');
  }

  function closePurchase(){
    purchaseModal.setAttribute('aria-hidden','true');
    purchaseForm.reset();
    selectedAccount.value = '';
  }

  document.querySelectorAll('.btn-buy').forEach(btn => {
    btn.addEventListener('click', () => {
      const account = btn.getAttribute('data-account') || 'akun FF/ML';
      const productMessage = encodeURIComponent('Halo Admin JB DENZZ STORE, saya ingin membeli ' + account + ' untuk akun FF/ML');
      window.open('https://wa.me/' + waNumber + '?text=' + productMessage, '_blank');
    });
  });

  document.querySelectorAll('.wa-btn, .wa-float, .whatsapp-link').forEach(link => {
    link.href = waBase;
  });

  purchaseClose.addEventListener('click', closePurchase);
  cancelPurchase.addEventListener('click', closePurchase);
  purchaseModal.addEventListener('click', (e) => { if(e.target === purchaseModal) closePurchase(); });

  purchaseForm.addEventListener('submit', function(e){
    e.preventDefault();
    const data = new FormData(purchaseForm);
    // In real app, send to server. Here we'll just show confirmation.
    const buyer = data.get('buyerName');
    const contact = data.get('contact');
    const account = data.get('account');
    alert('Pesanan terkirim:\n' + account + '\nNama: ' + buyer + '\nKontak: ' + contact + '\nAdmin akan menghubungi Anda.');
    closePurchase();
  });
});
