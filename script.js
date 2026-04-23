document.addEventListener("DOMContentLoaded", () => {
  const year = document.getElementById("year");
  if (year) {
    year.textContent = new Date().getFullYear();
  }

  const faders = document.querySelectorAll(".fade-in");
  if (faders.length) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    }, { threshold: 0.2 });

    faders.forEach(fader => observer.observe(fader));
  }

  const menuBtn = document.querySelector(".menu-btn");
  const navUl = document.querySelector("nav ul");
  if (menuBtn && navUl) {
    menuBtn.addEventListener("click", () => {
      navUl.classList.toggle("open");
      menuBtn.setAttribute("aria-expanded", navUl.classList.contains("open") ? "true" : "false");
    });
  }

  const themeToggle = document.querySelector(".theme-toggle");
  if (themeToggle) {
    if (localStorage.getItem("theme") === "light") {
      document.body.classList.add("light-mode");
    }

    const syncThemeLabel = () => {
      themeToggle.textContent = document.body.classList.contains("light-mode") ? "\u2600\uFE0F" : "\uD83C\uDF19";
    };

    syncThemeLabel();
    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("light-mode");
      localStorage.setItem("theme", document.body.classList.contains("light-mode") ? "light" : "dark");
      syncThemeLabel();
    });
  }

  const typedText = document.querySelector(".typed-text");
  if (typedText) {
    const source = typedText.dataset.words || "Alexis Beaufils";
    const words = source.split("|").map(item => item.trim()).filter(Boolean);
    let wordIndex = 0;
    let charIndex = 0;

    const type = () => {
      if (charIndex < words[wordIndex].length) {
        typedText.textContent += words[wordIndex].charAt(charIndex);
        charIndex += 1;
        setTimeout(type, 90);
      } else {
        setTimeout(erase, 1400);
      }
    };

    const erase = () => {
      if (charIndex > 0) {
        typedText.textContent = words[wordIndex].substring(0, charIndex - 1);
        charIndex -= 1;
        setTimeout(erase, 45);
      } else {
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(type, 600);
      }
    };

    if (words.length) {
      setTimeout(type, 700);
    }
  }

  const scrollBtn = document.getElementById("scrollTopBtn");
  if (scrollBtn) {
    window.addEventListener("scroll", () => {
      scrollBtn.style.display = window.scrollY > 300 ? "block" : "none";
    });
    scrollBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  const parallaxImages = document.querySelectorAll(".parallax");
  if (parallaxImages.length) {
    window.addEventListener("mousemove", event => {
      const x = (window.innerWidth / 2 - event.pageX) / 50;
      const y = (window.innerHeight / 2 - event.pageY) / 50;
      parallaxImages.forEach(img => {
        img.style.transform = `translate(${x}px, ${y}px)`;
      });
    });
  }

  const zoomableImages = document.querySelectorAll(".project-image, .project-gallery img");
  if (zoomableImages.length) {
    const lightbox = document.createElement("div");
    lightbox.className = "image-lightbox";
    lightbox.setAttribute("aria-hidden", "true");
    lightbox.innerHTML = `
      <div class="image-lightbox-dialog">
        <button class="image-lightbox-close" type="button" aria-label="Fermer l'image">&times;</button>
        <img src="" alt="">
        <p class="image-lightbox-caption"></p>
      </div>
    `;

    document.body.appendChild(lightbox);

    const lightboxImage = lightbox.querySelector("img");
    const lightboxCaption = lightbox.querySelector(".image-lightbox-caption");
    const lightboxClose = lightbox.querySelector(".image-lightbox-close");

    const closeLightbox = () => {
      lightbox.classList.remove("open");
      lightbox.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    };

    const openLightbox = image => {
      const figure = image.closest("figure");
      const caption = figure?.querySelector("figcaption")?.textContent?.trim() || image.alt || "";

      lightboxImage.src = image.currentSrc || image.src;
      lightboxImage.alt = image.alt || "Image agrandie";
      lightboxCaption.textContent = caption;
      lightbox.classList.add("open");
      lightbox.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    };

    zoomableImages.forEach(image => {
      image.addEventListener("click", () => openLightbox(image));
    });

    lightboxClose.addEventListener("click", closeLightbox);
    lightbox.addEventListener("click", event => {
      if (event.target === lightbox) {
        closeLightbox();
      }
    });

    document.addEventListener("keydown", event => {
      if (event.key === "Escape" && lightbox.classList.contains("open")) {
        closeLightbox();
      }
    });
  }

  const veilleGrid = document.getElementById("veille-grid");
  const veilleStatus = document.getElementById("veille-status");
  const veilleLastUpdated = document.getElementById("veille-last-updated");
  const veilleRefresh = document.getElementById("veille-refresh");
  const veillePagination = document.getElementById("veille-pagination");
  const veillePrev = document.getElementById("veille-prev");
  const veilleNext = document.getElementById("veille-next");
  const veillePageInfo = document.getElementById("veille-page-info");

  if (veilleGrid && veilleStatus && veilleLastUpdated && veilleRefresh && veillePagination && veillePrev && veilleNext && veillePageInfo) {
    const veilleKeywords = [
      "cyber",
      "securite",
      "sécurité",
      "vulnerabilite",
      "vulnérabilité",
      "vulnerabilites",
      "vulnérabilités",
      "ransomware",
      "phishing",
      "zero-day",
      "edr",
      "xdr",
      "siem",
      "soc",
      "anssi",
      "cert",
      "active directory",
      "windows server",
      "linux",
      "reseau",
      "réseau",
      "vpn",
      "firewall",
      "switch",
      "routeur",
      "infrastructure",
      "supervision",
      "cloud",
      "virtualisation",
      "hyper-v",
      "vmware",
      "proxmox",
      "microsoft 365",
      "openai",
      "ia",
      "intelligence artificielle",
      "llm",
      "machine learning",
      "genai"
    ];

    const veilleFeeds = [
      { label: "CERT-FR", url: "https://www.cert.ssi.gouv.fr/feed/" },
      { label: "IT-Connect", url: "https://www.it-connect.fr/feed/" },
      { label: "IT-Connect", url: "https://www.it-connect.fr/tag/cybersecurite/feed/" },
      { label: "LeMagIT", url: "https://www.lemagit.fr/rss/ContentSyndication.xml" },
      { label: "LeMagIT", url: "https://www.lemagit.fr/rss/Conseils-IT.xml" }
    ];

    const veilleCacheKey = "portfolio-rss-cache-v1";
    const veilleCacheDuration = 15 * 60 * 1000;
    const veilleItemsPerPage = 6;
    let veilleItems = [];
    let veillePage = 0;

    const setVeilleStatus = (message, type = "info") => {
      veilleStatus.textContent = message;
      veilleStatus.className = `veille-status${type ? ` ${type}` : ""}`;
    };

    const formatDateTime = value => {
      if (!value) {
        return "Jamais";
      }

      const date = new Date(value);
      if (Number.isNaN(date.getTime())) {
        return "Date indisponible";
      }

      return new Intl.DateTimeFormat("fr-FR", {
        dateStyle: "medium",
        timeStyle: "short"
      }).format(date);
    };

    const formatRelativeTime = value => {
      const date = new Date(value);
      if (Number.isNaN(date.getTime())) {
        return "recent";
      }

      const diffMs = date.getTime() - Date.now();
      const diffMinutes = Math.round(diffMs / 60000);
      const rtf = new Intl.RelativeTimeFormat("fr", { numeric: "auto" });

      if (Math.abs(diffMinutes) < 60) {
        return rtf.format(diffMinutes, "minute");
      }

      const diffHours = Math.round(diffMinutes / 60);
      if (Math.abs(diffHours) < 24) {
        return rtf.format(diffHours, "hour");
      }

      const diffDays = Math.round(diffHours / 24);
      return rtf.format(diffDays, "day");
    };

    const escapeHtml = value => String(value || "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll("\"", "&quot;")
      .replaceAll("'", "&#39;");

    const stripHtml = html => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html || "", "text/html");
      return (doc.body.textContent || "").replace(/\s+/g, " ").trim();
    };

    const truncateText = (value, limit = 170) => {
      const cleanValue = value.trim();
      if (cleanValue.length <= limit) {
        return cleanValue;
      }

      return `${cleanValue.slice(0, limit).trim()}...`;
    };

    const normalizeFeedItem = (item, label) => {
      const rawDate = item.pubDate || item.isoDate || item.updated || item.published || "";
      const parsedDate = new Date(rawDate);
      const description = truncateText(stripHtml(item.description || item.content || item.summary || "Article de veille cybersecurite."));
      const lowerTitle = (item.title || "").toLowerCase();
      const lowerDescription = description.toLowerCase();
      const isSecurityAlert = lowerTitle.includes("alerte")
        || lowerTitle.includes("urgence")
        || lowerTitle.includes("critique")
        || lowerTitle.includes("vulnérabilité")
        || lowerTitle.includes("vulnerabilite")
        || lowerTitle.includes("cve-")
        || lowerDescription.includes("alerte en cours")
        || lowerDescription.includes("activement exploit")
        || lowerTitle.includes("certfr-") && lowerTitle.includes("-ale-");
      const isSecurityAdvisory = lowerTitle.includes("avis")
        || lowerTitle.includes("bulletin")
        || lowerTitle.includes("certfr-") && lowerTitle.includes("-avi-");

      return {
        source: label,
        title: item.title || "Article sans titre",
        link: item.link || "#",
        description,
        publishedAt: Number.isNaN(parsedDate.getTime()) ? 0 : parsedDate.getTime(),
        isSecurityAlert,
        isSecurityAdvisory,
        priority: isSecurityAlert ? 2 : isSecurityAdvisory ? 1 : 0
      };
    };

    const getCachedVeille = () => {
      try {
        const rawCache = localStorage.getItem(veilleCacheKey);
        if (!rawCache) {
          return null;
        }

        const parsedCache = JSON.parse(rawCache);
        if (!parsedCache?.timestamp || !Array.isArray(parsedCache.items)) {
          return null;
        }

        return parsedCache;
      } catch {
        return null;
      }
    };

    const saveCachedVeille = items => {
      localStorage.setItem(veilleCacheKey, JSON.stringify({
        timestamp: Date.now(),
        items
      }));
    };

    const mergeFeedItems = items => {
      const seen = new Set();
      return items
        .filter(item => item.link && item.title)
        .filter(item => {
          const searchableText = `${item.title} ${item.description}`.toLowerCase();
          return veilleKeywords.some(keyword => searchableText.includes(keyword));
        })
        .filter(item => {
          const key = `${item.link}::${item.title}`;
          if (seen.has(key)) {
            return false;
          }

          seen.add(key);
          return true;
        })
        .sort((left, right) => {
          if (right.priority !== left.priority) {
            return right.priority - left.priority;
          }

          return right.publishedAt - left.publishedAt;
        });
    };

    const renderVeille = () => {
      if (!veilleItems.length) {
        veilleGrid.innerHTML = "";
        veillePagination.hidden = true;
        return;
      }

      const totalPages = Math.max(1, Math.ceil(veilleItems.length / veilleItemsPerPage));
      veillePage = Math.min(veillePage, totalPages - 1);

      const start = veillePage * veilleItemsPerPage;
      const end = start + veilleItemsPerPage;
      const visibleItems = veilleItems.slice(start, end);

      veilleGrid.innerHTML = visibleItems.map(item => `
        <article class="veille-article">
          <div class="veille-article-top">
            <span class="veille-pill${item.isSecurityAlert ? " alert" : item.isSecurityAdvisory ? " advisory" : ""}">${escapeHtml(item.source)}</span>
            <span class="veille-age">${escapeHtml(formatRelativeTime(item.publishedAt))}</span>
          </div>
          <div class="veille-flags">
            ${item.isSecurityAlert ? '<span class="veille-flag alert">Alerte de securite</span>' : ""}
            ${item.source === "CERT-FR" ? '<span class="veille-flag cert">Source officielle CERT-FR</span>' : ""}
          </div>
          <h3 class="veille-title">${escapeHtml(item.title)}</h3>
          <p class="veille-desc">${escapeHtml(item.description || "Article de veille cybersecurite.")}</p>
          <a class="veille-link" href="${escapeHtml(item.link)}" target="_blank" rel="noopener noreferrer">
            Lire l'article
            <span aria-hidden="true">&rarr;</span>
          </a>
        </article>
      `).join("");

      veillePagination.hidden = totalPages <= 1;
      veillePrev.disabled = veillePage === 0;
      veilleNext.disabled = veillePage >= totalPages - 1;
      veillePageInfo.textContent = `${veillePage + 1} / ${totalPages}`;
    };

    const fetchFeedWithRss2Json = async feed => {
      const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feed.url)}`);
      if (!response.ok) {
        throw new Error(`Impossible de charger ${feed.label}`);
      }

      const data = await response.json();
      if (data.status && data.status !== "ok") {
        throw new Error(data.message || `Flux invalide pour ${feed.label}`);
      }

      return (data.items || []).map(item => normalizeFeedItem(item, feed.label));
    };

    const fetchFeedWithXmlFallback = async feed => {
      const response = await fetch(`https://allorigins.hexlet.app/get?url=${encodeURIComponent(feed.url)}`);
      if (!response.ok) {
        throw new Error(`Flux indisponible pour ${feed.label}`);
      }

      const data = await response.json();
      const parser = new DOMParser();
      const xml = parser.parseFromString(data.contents || "", "text/xml");
      const xmlItems = Array.from(xml.querySelectorAll("item, entry"));

      return xmlItems.map(item => {
        const linkNode = item.querySelector("link");
        const link = linkNode?.getAttribute("href") || linkNode?.textContent || "";

        return normalizeFeedItem({
          title: item.querySelector("title")?.textContent || "",
          link,
          description: item.querySelector("description")?.textContent || item.querySelector("summary")?.textContent || "",
          pubDate: item.querySelector("pubDate")?.textContent || item.querySelector("updated")?.textContent || item.querySelector("published")?.textContent || ""
        }, feed.label);
      });
    };

    const fetchSingleVeilleFeed = async feed => {
      try {
        return await fetchFeedWithRss2Json(feed);
      } catch {
        return fetchFeedWithXmlFallback(feed);
      }
    };

    const hydrateVeille = (items, timestamp, statusMessage) => {
      veilleItems = mergeFeedItems(items).slice(0, 18);
      veillePage = 0;
      renderVeille();
      veilleLastUpdated.textContent = formatDateTime(timestamp);
      setVeilleStatus(statusMessage, "success");
    };

    const loadVeille = async (forceRefresh = false) => {
      const cachedVeille = getCachedVeille();
      const cacheIsFresh = cachedVeille && (Date.now() - cachedVeille.timestamp < veilleCacheDuration);

      if (!forceRefresh && cacheIsFresh) {
        hydrateVeille(cachedVeille.items, cachedVeille.timestamp, "Veille chargee depuis le cache local.");
        return;
      }

      setVeilleStatus("Mise a jour des flux RSS en cours...", "info");
      veilleRefresh.disabled = true;

      try {
        const results = await Promise.allSettled(veilleFeeds.map(fetchSingleVeilleFeed));
        const loadedItems = results
          .filter(result => result.status === "fulfilled")
          .flatMap(result => result.value);

        if (!loadedItems.length) {
          throw new Error("Aucun article n'a pu etre recupere.");
        }

        saveCachedVeille(loadedItems);
        hydrateVeille(loadedItems, Date.now(), "Veille RSS mise a jour automatiquement.");
      } catch {
        if (cachedVeille?.items?.length) {
          hydrateVeille(cachedVeille.items, cachedVeille.timestamp, "Flux indisponibles pour le moment, affichage du dernier cache disponible.");
        } else {
          veilleItems = [];
          renderVeille();
          veilleLastUpdated.textContent = "Indisponible";
          setVeilleStatus("Impossible de charger les flux RSS pour le moment.", "error");
        }
      } finally {
        veilleRefresh.disabled = false;
      }
    };

    veilleRefresh.addEventListener("click", () => {
      loadVeille(true);
    });

    veillePrev.addEventListener("click", () => {
      if (veillePage > 0) {
        veillePage -= 1;
        renderVeille();
      }
    });

    veilleNext.addEventListener("click", () => {
      const totalPages = Math.ceil(veilleItems.length / veilleItemsPerPage);
      if (veillePage < totalPages - 1) {
        veillePage += 1;
        renderVeille();
      }
    });

    loadVeille();
    window.setInterval(() => {
      loadVeille(true);
    }, veilleCacheDuration);
  }
});
