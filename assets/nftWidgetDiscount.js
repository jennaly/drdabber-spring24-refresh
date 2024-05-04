(async function () {
    try {

        let widgetSettings = JSON.parse(sessionStorage.getItem("niftyWidgetSession"));
        if(!widgetSettings) {
            const res = await fetch(
                `https://app.niftybridge.io/api/shop/public-shop-widget-settings?shop=${Shopify.shop}`
            );
            widgetSettings = await res.json()
        }

        if(widgetSettings && widgetSettings.length) {

            function mountDiscountWidget(discountParams) {

                if(document.querySelector("#nftDiscountWidget")?.innerHTML !== '') {
                    return
                }

                const discountWidgetParams = {
                    mode: 'nft',
                    parentElement: document.querySelector("#nftDiscountWidget"),
                    networkId: discountParams.networkId,
                    collections: JSON.parse(discountParams.collections),

                    //for test
                    //networkId: 137,
                    //collections: ["0x8DadB6b9E29C51b1273EEfDF9A30455F243A0951", "0x9a14E158C25A1DBE432e3eD2315AEA1Ba251Da5D"],

                    buttonClassName: discountParams.buttonClass || null,
                    walletsToInclude: JSON.parse(discountParams.walletsToInclude) || null,
                    buttonTitle: discountParams.buttonTitle || "Verify NFT",

                    onConfirmCallback: async ({walletAddress}) => {
                        const rawResponse = await fetch(
                            `https://app.niftybridge.io/api/discount-code/create`,
                            {
                                method: "POST",
                                headers: {
                                    Accept: "application/json",
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify({
                                    shopDomain: Shopify.shop,
                                    widgetId: discountParams.id,
                                    userAddress: walletAddress,
                                }),
                            }
                        );
                        const res = await rawResponse.json();
                        await fetch(
                            "https://" + window.location.host + "/discount/" + res.discountCode
                        );
                        window.location.href = "/checkout";
                    },

                    onErrorCallback: () => {
                        console.log("error");
                    },
                    onUnconfirmCallback: () => {
                        console.log("not confirmed");
                    },
                };

                const discountWidget = new EmbeddableWidget(discountWidgetParams);

                discountWidget.mount();
              
              const discountWidgetOpenBtn = document.body.querySelector("#nftDiscountWidget")
              if(discountWidgetOpenBtn) {discountWidgetOpenBtn.addEventListener('click', () => {document.querySelector("#widget-cart-close").click()})}

            }

            function unmountDiscountWidget() {
                const nftDiscountWidget = document.querySelector("#nftDiscountWidget")
                if(nftDiscountWidget) {
                    nftDiscountWidget.innerHTML = ''
                }
            }

            async function checkCart() {

                setTimeout( async() => {
                    let discountParams

                    const res = await fetch(window.Shopify.routes.root + "cart.js" + "?nftScipDetection");
                    const cart = JSON.parse(await res.text())

                    for(let i = 0; i < cart.items.length; i++) {
                        const productRes = await fetch(window.Shopify.routes.root + 'products/' + cart.items[i].handle + ".js")
                        const product = JSON.parse(await productRes.text())

                        discountParams = widgetSettings.find(item => product.tags.map(item => item.toLowerCase()).includes(item.productTag.toLowerCase()) && item.widgetType === 'Discount')

                        if(discountParams) {
                            mountDiscountWidget(discountParams)
                            return
                        }

                    }

                    if(!discountParams) {
                        unmountDiscountWidget()
                    }
                }, 1000)

            }

            if(window.location.href.includes('cart')) {
                checkCart()
            }

            const { fetch: originalFetch } = window;
            window.fetch = async (...args) => {
                let [resource, config ] = args;

                const response = await originalFetch(resource, config);

                if(
                    (
                        response.url.includes('cart/add') ||
                        response.url.includes('cart/clear') ||
                        response.url.includes('cart.js') ||
                        response.url.includes('cart/change')
                    ) &&
                    !response.url.includes('nftScipDetection')
                ) {

                    checkCart()
                }

                return response;
            };

            function addXMLRequestCallback(callback) {
                var oldSend, i;
                if (XMLHttpRequest.callbacks) {
                    XMLHttpRequest.callbacks.push(callback);
                } else {
                    XMLHttpRequest.callbacks = [callback];
                    oldSend = XMLHttpRequest.prototype.send;
                    XMLHttpRequest.prototype.send = function() {
                        for (i = 0; i < XMLHttpRequest.callbacks.length; i++) {
                            XMLHttpRequest.callbacks[i](this);
                        }
                        oldSend.apply(this, arguments);
                    }
                }
            }

            addXMLRequestCallback(async function(xhr) {

                if(
                    (
                        xhr?._url?.includes('cart/add') ||
                        xhr?._url?.includes('cart/clear') ||
                        xhr?._url?.includes('cart.js') ||
                        xhr?._url?.includes('cart/change')
                    ) &&
                    !xhr?._url.includes('nftScipDetection')
                ) {
                    checkCart()
                }

            });
        }

    } catch(e) {

        console.log('nft discount widget error', e)
    }
})();