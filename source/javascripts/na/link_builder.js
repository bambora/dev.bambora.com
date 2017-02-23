(function() {
  'use strict';

  const HPF_BASE_URL = 'https://www.beanstream.com/scripts/payment/payment.asp';

  // required
  const HPF_MERCHANT_ID = 'merchant_id';

  // card info
  const HPF_AMOUNT = 'trnAmount';
  const HPF_ORDER_NUMBER = 'trnOrderNumber';
  const HPF_TRANSACTION_TYPE = 'trnType';
  const HPF_CARD_OWNER = 'trnCardOwner';

  // billing info
  const HPF_BILL_NAME = 'ordName';
  const HPF_BILL_EMAIL = 'ordEmailAddress';
  const HPF_BILL_ADDRESS_1 = 'ordAddress1';
  const HPF_BILL_ADDRESS_2 = 'ordAddress2';
  const HPF_BILL_CITY = 'ordCity';
  const HPF_BILL_PROVINCE = 'ordProvince';
  const HPF_BILL_POSTAL_CODE = 'ordPostalCode';
  const HPF_BILL_COUNTRY = 'ordCountry';

  // shipping info
  const HPF_SHIP_NAME = 'shipName';
  const HPF_SHIP_EMAIL = 'shipEmailAddress';
  const HPF_SHIP_PHONE = 'shipPhoneNumber';
  const HPF_SHIP_ADDRESS_1 = 'shipAddress1';
  const HPF_SHIP_ADDRESS_2 = 'shipAddress2';
  const HPF_SHIP_CITY = 'shipCity';
  const HPF_SHIP_PROVINCE = 'shipProvince';
  const HPF_SHIP_POSTAL_CODE = 'shipPostalCode';
  const HPF_SHIP_COUNTRY = 'shipCountry';

  // additional info
  const HPF_APPROVED_PAGE = 'approvedPage';
  const HPF_DECLINED_PAGE = 'declinedPage';
  const HPF_HASH_VALUE = 'hashValue';
  const HPF_HASH_EXPIRY = 'hashExpiry';
  const HPF_LANGUAGE = 'trnLanguage';
  const HPF_REF_1 = 'ref1';
  const HPF_REF_2 = 'ref2';
  const HPF_REF_3 = 'ref3';
  const HPF_REF_4 = 'ref4';
  const HPF_REF_5 = 'ref5';

  // desjardins info
  const HPF_D_FINANCING_TYPE = 'aDFinancingType';
  const HPF_D_PLAN_NUMBER = 'aDPlanNumber';
  const HPF_D_GRACE_PERIOD = 'aDGracePeriod';
  const HPF_D_TERM = 'aDTerm';

  function FormController() {
  }

  FormController.prototype.init = function(){
    this.cacheDom();
    this.attachListeners();
  };

  FormController.prototype.cacheDom = function(){
    this.form = document.getElementById('form');

    this.merchantId = document.getElementById('merchant-id');
    this.hashKey = document.getElementById('hash-key');
    this.md5Radio = document.getElementById('md5-radio');
    this.sha1Radio = document.getElementById('sha-1-radio');

    this.message = document.getElementById('message');
    this.generatedLink = document.getElementById('link');

    this.amount = document.getElementById('amount');
    this.orderNumber = document.getElementById('order-number');
    this.transactionType = document.getElementById('transaction-type');
    this.cardOwner = document.getElementById('card-owner');

    this.orderName = document.getElementById('order-name');
    this.orderEmail = document.getElementById('order-email');
    this.orderAddress1 = document.getElementById('order-address-1');
    this.orderAddress2 = document.getElementById('order-address-2');
    this.orderCity = document.getElementById('order-city');
    this.orderProvince = document.getElementById('order-province');
    this.orderPostalCode = document.getElementById('order-postal-code');
    this.orderCountry = document.getElementById('order-country');

    this.shipName = document.getElementById('ship-name');
    this.shipEmail = document.getElementById('ship-email');
    this.shipPhone = document.getElementById('ship-phone');
    this.shipAddress1 = document.getElementById('ship-address-1');
    this.shipAddress2 = document.getElementById('ship-address-2');
    this.shipCity = document.getElementById('ship-city');
    this.shipProvince = document.getElementById('ship-province');
    this.shipPostalCode = document.getElementById('ship-postal-code');
    this.shipCountry = document.getElementById('ship-country');

    this.approvedLink = document.getElementById('approved-link');
    this.declinedLink = document.getElementById('declined-link');

    this.hashExpiry = document.getElementById('hash-expiry');

    this.language = document.getElementById('language');

    this.ref1 = document.getElementById('ref1');
    this.ref2 = document.getElementById('ref2');
    this.ref3 = document.getElementById('ref3');
    this.ref4 = document.getElementById('ref4');
    this.ref5 = document.getElementById('ref5');

    this.dFinancingType = document.getElementById('d-financing-type');
    this.dPlanNumber = document.getElementById('d-plan-number');
    this.dGracePeriod = document.getElementById('d-grace-period');
    this.dTerm = document.getElementById('d-term');
  };

  FormController.prototype.attachListeners = function(){
    this.form.addEventListener("submit", this.onSubmit.bind(this), false);
  };

  FormController.prototype.onSubmit = function(e){
    e.preventDefault()
    this.createLink();
  };

  FormController.prototype.createStringToHash = function(){
    var perams = {};
    perams[HPF_MERCHANT_ID] = this.merchantId.value.trim();

    perams[HPF_AMOUNT] = this.amount.value.trim();
    perams[HPF_ORDER_NUMBER] = this.orderNumber.value.trim();
    perams[HPF_TRANSACTION_TYPE] = this.transactionType.value.trim();
    perams[HPF_CARD_OWNER] = this.cardOwner.value.trim().split(' ').join('+');

    perams[HPF_BILL_NAME] = this.orderName.value.trim().split(' ').join('+');
    perams[HPF_BILL_EMAIL] = this.orderEmail.value.trim();
    perams[HPF_BILL_ADDRESS_1] = this.orderAddress1.value.trim().split(' ').join('+');
    perams[HPF_BILL_ADDRESS_2] = this.orderAddress2.value.trim().split(' ').join('+');
    perams[HPF_BILL_CITY] = this.orderCity.value.trim().split(' ').join('+');
    perams[HPF_BILL_PROVINCE] = this.orderProvince.value.trim().split(' ').join('+');
    perams[HPF_BILL_POSTAL_CODE] = this.orderPostalCode.value.trim().split(' ').join('+');
    perams[HPF_BILL_COUNTRY] = this.orderCountry.value.trim();

    perams[HPF_SHIP_NAME] = this.shipName.value.trim().split(' ').join('+');
    perams[HPF_SHIP_EMAIL] = this.shipEmail.value.trim();
    perams[HPF_SHIP_PHONE] = this.shipPhone.value.trim().split(' ').join('+');
    perams[HPF_SHIP_ADDRESS_1] = this.shipAddress1.value.trim().split(' ').join('+');
    perams[HPF_SHIP_ADDRESS_2] = this.shipAddress2.value.trim().split(' ').join('+');
    perams[HPF_SHIP_CITY] = this.shipCity.value.trim().split(' ').join('+');
    perams[HPF_SHIP_PROVINCE] = this.shipProvince.value.trim().split(' ').join('+');
    perams[HPF_SHIP_POSTAL_CODE] = this.shipPostalCode.value.trim().split(' ').join('+');
    perams[HPF_SHIP_COUNTRY] = this.shipCountry.value.trim();

    perams[HPF_APPROVED_PAGE] = encodeURIComponent(this.approvedLink.value.trim());
    perams[HPF_DECLINED_PAGE] = encodeURIComponent(this.declinedLink.value.trim());
    perams[HPF_HASH_EXPIRY] = this.hashExpiry.value.trim();
    perams[HPF_LANGUAGE] = this.language.value.trim();
    perams[HPF_REF_1] = this.ref1.value.trim();
    perams[HPF_REF_2] = this.ref2.value.trim();
    perams[HPF_REF_3] = this.ref3.value.trim();
    perams[HPF_REF_4] = this.ref4.value.trim();
    perams[HPF_REF_5] = this.ref5.value.trim();

    perams[HPF_D_FINANCING_TYPE] = this.dFinancingType.value.trim();
    perams[HPF_D_PLAN_NUMBER] = this.dPlanNumber.value.trim();
    perams[HPF_D_GRACE_PERIOD] = this.dGracePeriod.value.trim();
    perams[HPF_D_TERM] = this.dTerm.value.trim();

    var stringToHash = '';
    for (var key in perams) {
      if (perams[key]) {
        stringToHash += key + '=' + perams[key];
      }
    }
    return stringToHash;
  }

  FormController.prototype.createLink = function(){
    var hashKey = this.hashKey.value;
    var md5Radio = this.md5Radio.checked;
    var sha1Radio = this.sha1Radio.checked;

    var stringToHash = this.createStringToHash();
    var hash;

    if (md5Radio) {
  	   hash = CryptoJS.MD5(stringToHash + hashKey);
  	} else {
  	   hash = CryptoJS.SHA1(stringToHash + hashKey);
  	}

    if(hashKey == '') {
      var link =  HPF_BASE_URL + '?' + stringToHash;
    } else {
      var link =  HPF_BASE_URL + '?' + stringToHash + '&' + HPF_HASH_VALUE + '=' + hash;
    }

    this.message.classList.remove('hidden');
    this.message.classList.add('visible');
    this.message.classList.add('success');
    this.generatedLink.href = link;
    this.generatedLink.innerHTML = link;
    location.hash = '#link';
  };

  var formCtrl = new FormController();
  formCtrl.init();
})();
