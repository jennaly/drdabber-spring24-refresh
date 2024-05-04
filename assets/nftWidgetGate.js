async function getProduct() {
    const res = await fetch(window.location.pathname + ".json");
    const product = await res.json();
    return product?.product;
}

function addGateWidget(widgetSettings) {

    
    const nftWidgetButtonsWrapper = document.querySelector("#nftRemoveBlock");
    if (nftWidgetButtonsWrapper) {
        nftWidgetButtonsWrapper.insertAdjacentHTML("beforebegin", '<div id="nftGateWidget"></div>');
      
        const gateWidgetParams = {
          mode: 'nft',
          parentElement: document.querySelector("#nftGateWidget"),
          networkId: widgetSettings.networkId,
          collections: JSON.parse(widgetSettings.collections),

          // for test
          //networkId: 137,
          //collections: ["0x8DadB6b9E29C51b1273EEfDF9A30455F243A0951", "0x9a14E158C25A1DBE432e3eD2315AEA1Ba251Da5D"],

          buttonClassName: widgetSettings.buttonClass,
          walletsToInclude: JSON.parse(widgetSettings.walletsToInclude),
          buttonTitle: widgetSettings.buttonTitle,
  
          onConfirmCallback: async (params) => {
              console.log('confirm')
              document.querySelector("#gateWidgetAddBtn").click()
          },
  
          onErrorCallback: () => {console.log("error")},
  
          onUnconfirmCallback: () => {console.log("not confirmed")}
      }

        const gateWidget = new EmbeddableWidget(gateWidgetParams);
      
        gateWidget.mount();
    }
}

async  function initial() {
    let widgetSettings = JSON.parse(sessionStorage.getItem("niftyWidgetSession"))
    if(!widgetSettings) {
        const res = await fetch(
            `https://app.niftybridge.io/api/shop/public-shop-widget-settings?shop=${Shopify.shop}`
        );
        widgetSettings = await res.json()
    }

    const product = await getProduct()

    if (product && product.tags?.length && widgetSettings?.length) {
        const gateParams = widgetSettings.find(item => product.tags.toLowerCase().includes(item.productTag.toLowerCase()) && item.widgetType === "Gate")
        if(gateParams) {
            addGateWidget(gateParams)
            return
        }
    }

    const child = document.querySelector("#nftRemoveBlock")?.firstElementChild
    if(child) {
        child.parentElement.replaceWith(...child.parentElement.childNodes);
    }

}


(function () {
    try {
        if( document.readyState !== 'loading' ) {
            initial();
        } else {
            document.addEventListener('DOMContentLoaded', function () {
              initial();
            });
        }
    } catch(error) {
        console.log('nftGateWidget error', error)
    }

})()