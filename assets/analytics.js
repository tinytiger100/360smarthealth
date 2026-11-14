/**
 * Google Analytics 4 for this static site.
 *
 * Loaded on every page. It does nothing until GA4_MEASUREMENT_ID is set.
 * No Google script is requested, and no events are sent, while the constant
 * below is empty.
 *
 * To turn analytics on, replace the empty string with your measurement ID
 * (it looks like G-XXXXXXXXXX). Clicks on the green Prolon discount buttons
 * are then sent as an event named prolon_click.
 *
 * Ready-to-enable snippet, kept here so it is not pasted into every HTML file.
 * The loader below is this snippet, and it runs only after an ID is set:
 *
 * <!-- Google tag (gtag.js) -->
 * <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
 * <script>
 *   window.dataLayer = window.dataLayer || [];
 *   function gtag(){dataLayer.push(arguments);}
 *   gtag('js', new Date());
 *   gtag('config', 'G-XXXXXXXXXX');
 * </script>
 */
var GA4_MEASUREMENT_ID = "";

(function () {
  var id = typeof GA4_MEASUREMENT_ID === "string" ? GA4_MEASUREMENT_ID.trim() : "";
  if (!/^G-[A-Z0-9]+$/.test(id)) return;

  window.dataLayer = window.dataLayer || [];
  function gtag(){window.dataLayer.push(arguments);}
  window.gtag = gtag;
  gtag("js", new Date());
  gtag("config", id);

  var script = document.createElement("script");
  script.async = true;
  script.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(id);
  document.head.appendChild(script);

  document.addEventListener("click", function (event) {
    var link = event.target && event.target.closest
      ? event.target.closest("a.btn-green")
      : null;
    if (!link) return;
    var href = link.href || "";
    if (href.indexOf("prolonlife.com") === -1) return;
    gtag("event", "prolon_click", {
      link_url: href,
      page_location: window.location.href,
      transport_type: "beacon"
    });
  });
})();