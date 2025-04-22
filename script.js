document.addEventListener('DOMContentLoaded', () => {
  // Mobile menu toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });

  const languages = {
    "am-ET": "Amharic",
    "ar-SA": "Arabic",
    "be-BY": "Belarusian",
    "bem-ZM": "Bemba",
    "bi-VU": "Bislama",
    "bjs-BB": "Bajan",
    "bn-IN": "Bengali",
    "bo-CN": "Tibetan",
    "br-FR": "Breton",
    "bs-BA": "Bosnian",
    "ca-ES": "Catalan",
    "cop-EG": "Coptic",
    "cs-CZ": "Czech",
    "cy-GB": "Welsh",
    "da-DK": "Danish",
    "dz-BT": "Dzongkha",
    "de-DE": "German",
    "dv-MV": "Maldivian",
    "el-GR": "Greek",
    "en-GB": "English",
    "es-ES": "Spanish",
    "et-EE": "Estonian",
    "eu-ES": "Basque",
    "fa-IR": "Persian",
    "fi-FI": "Finnish",
    "fn-FNG": "Fanagalo",
    "fo-FO": "Faroese",
    "fr-FR": "French",
    "gl-ES": "Galician",
    "gu-IN": "Gujarati",
    "ha-NE": "Hausa",
    "he-IL": "Hebrew",
    "hi-IN": "Hindi",
    "hr-HR": "Croatian",
    "hu-HU": "Hungarian",
    "id-ID": "Indonesian",
    "is-IS": "Icelandic",
    "it-IT": "Italian",
    "ja-JP": "Japanese",
    "kk-KZ": "Kazakh",
    "km-KM": "Khmer",
    "kn-IN": "Kannada",
    "ko-KR": "Korean",
    "ku-TR": "Kurdish",
    "ky-KG": "Kyrgyz",
    "la-VA": "Latin",
    "lo-LA": "Lao",
    "lv-LV": "Latvian",
    "men-SL": "Mende",
    "mg-MG": "Malagasy",
    "mi-NZ": "Maori",
    "ms-MY": "Malay",
    "mt-MT": "Maltese",
    "my-MM": "Burmese",
    "ne-NP": "Nepali",
    "niu-NU": "Niuean",
    "nl-NL": "Dutch",
    "no-NO": "Norwegian",
    "ny-MW": "Nyanja",
    "ur-PK": "Pakistani",
    "pau-PW": "Palauan",
    "pa-IN": "Panjabi",
    "ps-PK": "Pashto",
    "pis-SB": "Pijin",
    "pl-PL": "Polish",
    "pt-PT": "Portuguese",
    "rn-BI": "Kirundi",
    "ro-RO": "Romanian",
    "ru-RU": "Russian",
    "sg-CF": "Sango",
    "si-LK": "Sinhala",
    "sk-SK": "Slovak",
    "sm-WS": "Samoan",
    "sn-ZW": "Shona",
    "so-SO": "Somali",
    "sq-AL": "Albanian",
    "sr-RS": "Serbian",
    "sv-SE": "Swedish",
    "sw-SZ": "Swahili",
    "ta-LK": "Tamil",
    "te-IN": "Telugu",
    "tet-TL": "Tetum",
    "tg-TJ": "Tajik",
    "th-TH": "Thai",
    "ti-TI": "Tigrinya",
    "tk-TM": "Turkmen",
    "tl-PH": "Tagalog",
    "tn-BW": "Tswana",
    "to-TO": "Tongan",
    "tr-TR": "Turkish",
    "ug-CN": "Uighur",
    "uk-UA": "Ukrainian",
    "ur-IN": "Urdu",
    "vi-VN": "Vietnamese",
    "wa-BE": "Walloon",
    "wo-SN": "Wolof",
    "xh-ZA": "Xhosa",
    "yi-DE": "Yiddish",
    "zu-ZA": "Zulu"
  };
  
  const fromText = document.querySelector(".from-text");
  const toText = document.querySelector(".to-text");
  const exchangeIcon = document.querySelector(".exchange");
  const selectTag = document.querySelectorAll("select");
  const icons = document.querySelectorAll(".row ion-icon");
  const translateBtn = document.querySelector("button");

  selectTag.forEach((tag, id) => {
    for (let country_code in languages) {
      let selected = id === 0 ? country_code === "en-GB" ? "selected" : "" : country_code === "es-ES" ? "selected" : "";
      let option = `<option ${selected} value="${country_code}">${languages[country_code]}</option>`;
      tag.insertAdjacentHTML("beforeend", option);
    }
  });

  exchangeIcon.addEventListener("click", () => {
    let tempText = fromText.value;
    let tempLang = selectTag[0].value;
    fromText.value = toText.value;
    toText.value = tempText;
    selectTag[0].value = selectTag[1].value;
    selectTag[1].value = tempLang;
  });

  fromText.addEventListener("keyup", () => {
    if (!fromText.value) {
      toText.value = "";
    }
  });

  translateBtn.addEventListener("click", () => {
    let text = fromText.value.trim();
    let translateFrom = selectTag[0].value;
    let translateTo = selectTag[1].value;
    if (!text) return;
    toText.setAttribute("placeholder", "Translating...");
    let apiUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${translateFrom}|${translateTo}`;
    fetch(apiUrl).then(res => res.json()).then(data => {
      toText.value = data.responseData.translatedText;
      data.matches.forEach(data => {
        if (data.id === 0) {
          toText.value = data.translation;
        }
      });
      toText.setAttribute("placeholder", "Translation");
    }).catch(() => {
      toText.setAttribute("placeholder", "Error occurred. Please try again.");
    });
  });

  icons.forEach(icon => {
    icon.addEventListener("click", ({ target }) => {
      if (!fromText.value || !toText.value) return;
      if (target.classList.contains("fa-copy")) {
        if (target.id == "from") {
          navigator.clipboard.writeText(fromText.value);
        } else {
          navigator.clipboard.writeText(toText.value);
        }
      } else {
        let utterance;
        if (target.id == "from") {
          utterance = new SpeechSynthesisUtterance(fromText.value);
          utterance.lang = selectTag[0].value;
        } else {
          utterance = new SpeechSynthesisUtterance(toText.value);
          utterance.lang = selectTag[1].value;
        }
        speechSynthesis.speak(utterance);
      }
    });
  });

  // Review system
  const reviewForm = document.getElementById('review-form');
  const reviewContainer = document.getElementById('review-container');
  const starRating = document.querySelector('.star-rating');
  let currentRating = 0;

  starRating.addEventListener('click', (e) => {
    if (e.target.nodeName === 'ION-ICON') {
      currentRating = parseInt(e.target.getAttribute('data-value'));
      updateStarRating();
    }
  });

  starRating.addEventListener('mouseover', (e) => {
    if (e.target.nodeName === 'ION-ICON') {
      const value = parseInt(e.target.getAttribute('data-value'));
      updateStarRating(value);
    }
  });

  starRating.addEventListener('mouseout', () => {
    updateStarRating();
  });

  function updateStarRating(hover = currentRating) {
    const stars = starRating.children;
    for (let i = 0; i < stars.length; i++) {
      if (i < hover) {
        stars[i].setAttribute('name', 'star');
      } else {
        stars[i].setAttribute('name', 'star-outline');
      }
    }
  }

  reviewForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = reviewForm.elements.name.value.trim();
    const email = reviewForm.elements.email.value.trim();
    const reviewText = reviewForm.elements.review.value.trim();

    if (currentRating === 0) {
      alert('Please select a star rating');
      return;
    }

    if (username === '' || email === '' || reviewText === '') {
      alert('Please fill in all fields');
      return;
    }

    // Check if user has already submitted a review
    const reviews = JSON.parse(localStorage.getItem('reviews')) || {};
    if (reviews.hasOwnProperty(username)) {
      alert('You have already submitted a review. Only one review per username is allowed.');
      return;
    }

    const review = {
      text: reviewText,
      rating: currentRating,
      email: email,
      date: new Date().toISOString()
    };

    saveReview(username, review);
    const reviewElement = createReviewElement(username, review);
    reviewContainer.appendChild(reviewElement);

    reviewForm.reset();
    currentRating = 0;
    updateStarRating();
  });

  function createReviewElement(username, review) {
    const reviewDiv = document.createElement('div');
    reviewDiv.className = 'review';

    const stars = document.createElement('div');
    stars.className = 'star-rating';
    for (let i = 0; i < 5; i++) {
      const star = document.createElement('ion-icon');
      star.setAttribute('name', i < review.rating ? 'star' : 'star-outline');
      stars.appendChild(star);
    }

    const text = document.createElement('p');
    text.className = 'review-text';
    text.textContent = review.text;

    const reviewer = document.createElement('p');
    reviewer.className = 'reviewer';
    reviewer.textContent = `- ${username}`;

    const date = document.createElement('p');
    date.className = 'review-date';
    date.textContent = new Date(review.date).toLocaleDateString();

    reviewDiv.appendChild(stars);
    reviewDiv.appendChild(text);
    reviewDiv.appendChild(reviewer);
    reviewDiv.appendChild(date);

    return reviewDiv;
  }

  function saveReview(username, review) {
    const reviews = JSON.parse(localStorage.getItem('reviews')) || {};
    reviews[username] = review;
    localStorage.setItem('reviews', JSON.stringify(reviews));
  }

  // Load existing reviews
  function loadReviews() {
    const reviews = JSON.parse(localStorage.getItem('reviews')) || {};
    for (const [username, review] of Object.entries(reviews)) {
      const reviewElement = createReviewElement(username, review);
      reviewContainer.appendChild(reviewElement);
    }
  }

  loadReviews();

  // Contact form submission
  const contactForm = document.getElementById('contact-form');
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = contactForm.elements.name.value;
    const email = contactForm.elements.email.value;
    const subject = contactForm.elements.subject.value;
    const message = contactForm.elements.message.value;

    // Here you would typically send this data to a server
    console.log('Contact form submitted:', { name, email, subject, message });
    alert('Thank you for your message. We will get back to you soon!');
    contactForm.reset();
  });

  // Make all footer links functional
  const footerLinks = document.querySelectorAll('footer a');
  footerLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      alert(`You clicked on: ${link.textContent}. This feature is coming soon!`);
    });
  });

  // Make the CTA button in the hero section functional
  const ctaButton = document.querySelector('.cta-button');
  ctaButton.addEventListener('click', (e) => {
    e.preventDefault();
    const translatorSection = document.querySelector('#translator');
    translatorSection.scrollIntoView({ behavior: 'smooth' });
  });

  // Make social media links functional
  const socialLinks = document.querySelectorAll('.social-links a');
  socialLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const platform = link.getAttribute('aria-label');
      alert(`You clicked on the ${platform} icon. This would typically open our ${platform} page in a new tab.`);
    });
  });
});
