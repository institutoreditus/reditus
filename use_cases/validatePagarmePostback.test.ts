import validatePagarmePostback from "./validatePagarmePostback";

test.each([
  [
    "sha1=d151bbee8ca5d292b7f0acf893af136cce54f4cf",
    "id=9194552&fingerprint=abc28f62e0ee07eec6039f022851da14d9523390&event=transaction_status_changed&old_status=processing&desired_status=paid&current_status=refused&object=transaction&transaction%5Bobject%5D=transaction&transaction%5Bstatus%5D=refused&transaction%5Brefuse_reason%5D=acquirer&transaction%5Bstatus_reason%5D=acquirer&transaction%5Bacquirer_response_code%5D=1009&transaction%5Bacquirer_name%5D=pagarme&transaction%5Bacquirer_id%5D=5b70aea582295e517d69a124&transaction%5Bauthorization_code%5D=&transaction%5Bsoft_descriptor%5D=&transaction%5Btid%5D=9194552&transaction%5Bnsu%5D=9194552&transaction%5Bdate_created%5D=2020-07-11T22%3A03%3A33.589Z&transaction%5Bdate_updated%5D=2020-07-11T22%3A03%3A34.259Z&transaction%5Bamount%5D=1000&transaction%5Bauthorized_amount%5D=0&transaction%5Bpaid_amount%5D=0&transaction%5Brefunded_amount%5D=0&transaction%5Binstallments%5D=1&transaction%5Bid%5D=9194552&transaction%5Bcost%5D=0&transaction%5Bcard_holder_name%5D=SEAN%20LITTLE&transaction%5Bcard_last_digits%5D=3087&transaction%5Bcard_first_digits%5D=455646&transaction%5Bcard_brand%5D=visa&transaction%5Bcard_pin_mode%5D=&transaction%5Bcard_magstripe_fallback%5D=false&transaction%5Bcvm_pin%5D=false&transaction%5Bpostback_url%5D=https%3A%2F%2F94ecb4f830a5ed6d3bed1a54aed910bf.m.pipedream.net%2F&transaction%5Bpayment_method%5D=credit_card&transaction%5Bcapture_method%5D=ecommerce&transaction%5Bantifraud_score%5D=&transaction%5Bboleto_url%5D=&transaction%5Bboleto_barcode%5D=&transaction%5Bboleto_expiration_date%5D=&transaction%5Breferer%5D=api_key&transaction%5Bip%5D=179.34.147.83&transaction%5Bsubscription_id%5D=&transaction%5Bphone%5D=&transaction%5Baddress%5D=&transaction%5Bcustomer%5D%5Bobject%5D=customer&transaction%5Bcustomer%5D%5Bid%5D=3417600&transaction%5Bcustomer%5D%5Bexternal_id%5D=1&transaction%5Bcustomer%5D%5Btype%5D=individual&transaction%5Bcustomer%5D%5Bcountry%5D=ar&transaction%5Bcustomer%5D%5Bdocument_number%5D=&transaction%5Bcustomer%5D%5Bdocument_type%5D=cpf&transaction%5Bcustomer%5D%5Bname%5D=Rafael%20Gonsalves%20Rozendo&transaction%5Bcustomer%5D%5Bemail%5D=rafael.g.rozendo%40gmail.com&transaction%5Bcustomer%5D%5Bphone_numbers%5D%5B0%5D=%2B5521994457010&transaction%5Bcustomer%5D%5Bborn_at%5D=&transaction%5Bcustomer%5D%5Bbirthday%5D=&transaction%5Bcustomer%5D%5Bgender%5D=&transaction%5Bcustomer%5D%5Bdate_created%5D=2020-07-11T22%3A03%3A33.518Z&transaction%5Bcustomer%5D%5Bdocuments%5D%5B0%5D%5Bobject%5D=document&transaction%5Bcustomer%5D%5Bdocuments%5D%5B0%5D%5Bid%5D=doc_ckci746je0kxfp16ej9unaj8j&transaction%5Bcustomer%5D%5Bdocuments%5D%5B0%5D%5Btype%5D=cpf&transaction%5Bcustomer%5D%5Bdocuments%5D%5B0%5D%5Bnumber%5D=15284225708&transaction%5Bbilling%5D%5Bobject%5D=billing&transaction%5Bbilling%5D%5Bid%5D=1457936&transaction%5Bbilling%5D%5Bname%5D=Rafael%20Gonsalves%20Rozendo&transaction%5Bbilling%5D%5Baddress%5D%5Bobject%5D=address&transaction%5Bbilling%5D%5Baddress%5D%5Bstreet%5D=Rua%20argentina&transaction%5Bbilling%5D%5Baddress%5D%5Bcomplementary%5D=&transaction%5Bbilling%5D%5Baddress%5D%5Bstreet_number%5D=111&transaction%5Bbilling%5D%5Baddress%5D%5Bneighborhood%5D=arg%20bairro&transaction%5Bbilling%5D%5Baddress%5D%5Bcity%5D=buenos%20aires&transaction%5Bbilling%5D%5Baddress%5D%5Bstate%5D=ba&transaction%5Bbilling%5D%5Baddress%5D%5Bzipcode%5D=7777777&transaction%5Bbilling%5D%5Baddress%5D%5Bcountry%5D=ar&transaction%5Bbilling%5D%5Baddress%5D%5Bid%5D=3180955&transaction%5Bshipping%5D=&transaction%5Bitems%5D%5B0%5D%5Bobject%5D=item&transaction%5Bitems%5D%5B0%5D%5Bid%5D=Contrib-Unica-7ad093d0-2077-4c29-aaca-fff527d5d68d&transaction%5Bitems%5D%5B0%5D%5Btitle%5D=Contribui%C3%A7%C3%A3o%20%C3%BAnica%20Rafael%20Gonsalves%20Rozendo%2010.0&transaction%5Bitems%5D%5B0%5D%5Bunit_price%5D=1000&transaction%5Bitems%5D%5B0%5D%5Bquantity%5D=1&transaction%5Bitems%5D%5B0%5D%5Bcategory%5D=&transaction%5Bitems%5D%5B0%5D%5Btangible%5D=false&transaction%5Bitems%5D%5B0%5D%5Bvenue%5D=&transaction%5Bitems%5D%5B0%5D%5Bdate%5D=&transaction%5Bcard%5D%5Bobject%5D=card&transaction%5Bcard%5D%5Bid%5D=card_ckci746km0kxgp16e19t8xrnn&transaction%5Bcard%5D%5Bdate_created%5D=2020-07-11T22%3A03%3A33.575Z&transaction%5Bcard%5D%5Bdate_updated%5D=2020-07-11T22%3A03%3A34.313Z&transaction%5Bcard%5D%5Bbrand%5D=visa&transaction%5Bcard%5D%5Bholder_name%5D=SEAN%20LITTLE&transaction%5Bcard%5D%5Bfirst_digits%5D=455646&transaction%5Bcard%5D%5Blast_digits%5D=3087&transaction%5Bcard%5D%5Bcountry%5D=SPAIN&transaction%5Bcard%5D%5Bfingerprint%5D=ckci7464o5a2l0n17szipg86b&transaction%5Bcard%5D%5Bvalid%5D=false&transaction%5Bcard%5D%5Bexpiration_date%5D=0522&transaction%5Bsplit_rules%5D=&transaction%5Breference_key%5D=&transaction%5Bdevice%5D=&transaction%5Blocal_transaction_id%5D=&transaction%5Blocal_time%5D=&transaction%5Bfraud_covered%5D=false&transaction%5Bfraud_reimbursed%5D=&transaction%5Border_id%5D=&transaction%5Brisk_level%5D=unknown&transaction%5Breceipt_url%5D=&transaction%5Bpayment%5D=&transaction%5Baddition%5D=&transaction%5Bdiscount%5D=&transaction%5Bprivate_label%5D=",
  ],
  [
    "sha1=958ed3395dd72bb9e8e2d0ea060461f471ce8bd7",
    "id=9194562&fingerprint=b6fd45e84ce93e22966bb758d0bb16ad923490c3&event=transaction_status_changed&old_status=processing&desired_status=paid&current_status=paid&object=transaction&transaction%5Bobject%5D=transaction&transaction%5Bstatus%5D=paid&transaction%5Brefuse_reason%5D=&transaction%5Bstatus_reason%5D=acquirer&transaction%5Bacquirer_response_code%5D=0000&transaction%5Bacquirer_name%5D=pagarme&transaction%5Bacquirer_id%5D=5b70aea582295e517d69a124&transaction%5Bauthorization_code%5D=419275&transaction%5Bsoft_descriptor%5D=&transaction%5Btid%5D=9194562&transaction%5Bnsu%5D=9194562&transaction%5Bdate_created%5D=2020-07-11T22%3A06%3A24.141Z&transaction%5Bdate_updated%5D=2020-07-11T22%3A06%3A24.651Z&transaction%5Bamount%5D=1100&transaction%5Bauthorized_amount%5D=1100&transaction%5Bpaid_amount%5D=1100&transaction%5Brefunded_amount%5D=0&transaction%5Binstallments%5D=1&transaction%5Bid%5D=9194562&transaction%5Bcost%5D=120&transaction%5Bcard_holder_name%5D=TESTEE&transaction%5Bcard_last_digits%5D=4589&transaction%5Bcard_first_digits%5D=516277&transaction%5Bcard_brand%5D=mastercard&transaction%5Bcard_pin_mode%5D=&transaction%5Bcard_magstripe_fallback%5D=false&transaction%5Bcvm_pin%5D=false&transaction%5Bpostback_url%5D=https%3A%2F%2F94ecb4f830a5ed6d3bed1a54aed910bf.m.pipedream.net%2F&transaction%5Bpayment_method%5D=credit_card&transaction%5Bcapture_method%5D=ecommerce&transaction%5Bantifraud_score%5D=&transaction%5Bboleto_url%5D=&transaction%5Bboleto_barcode%5D=&transaction%5Bboleto_expiration_date%5D=&transaction%5Breferer%5D=api_key&transaction%5Bip%5D=179.34.147.83&transaction%5Bsubscription_id%5D=&transaction%5Bphone%5D=&transaction%5Baddress%5D=&transaction%5Bcustomer%5D%5Bobject%5D=customer&transaction%5Bcustomer%5D%5Bid%5D=3417607&transaction%5Bcustomer%5D%5Bexternal_id%5D=1&transaction%5Bcustomer%5D%5Btype%5D=individual&transaction%5Bcustomer%5D%5Bcountry%5D=br&transaction%5Bcustomer%5D%5Bdocument_number%5D=&transaction%5Bcustomer%5D%5Bdocument_type%5D=cpf&transaction%5Bcustomer%5D%5Bname%5D=Rafael%20Gonsalves%20Rozendo&transaction%5Bcustomer%5D%5Bemail%5D=rafael.g.rozendo%40gmail.com&transaction%5Bcustomer%5D%5Bphone_numbers%5D%5B0%5D=%2B5521994457010&transaction%5Bcustomer%5D%5Bborn_at%5D=&transaction%5Bcustomer%5D%5Bbirthday%5D=&transaction%5Bcustomer%5D%5Bgender%5D=&transaction%5Bcustomer%5D%5Bdate_created%5D=2020-07-11T22%3A06%3A24.068Z&transaction%5Bcustomer%5D%5Bdocuments%5D%5B0%5D%5Bobject%5D=document&transaction%5Bcustomer%5D%5Bdocuments%5D%5B0%5D%5Bid%5D=doc_ckci77u4u0l5o686ddq5pajec&transaction%5Bcustomer%5D%5Bdocuments%5D%5B0%5D%5Btype%5D=cpf&transaction%5Bcustomer%5D%5Bdocuments%5D%5B0%5D%5Bnumber%5D=15284225708&transaction%5Bbilling%5D%5Bobject%5D=billing&transaction%5Bbilling%5D%5Bid%5D=1457941&transaction%5Bbilling%5D%5Bname%5D=Rafael%20Gonsalves%20Rozendo&transaction%5Bbilling%5D%5Baddress%5D%5Bobject%5D=address&transaction%5Bbilling%5D%5Baddress%5D%5Bstreet%5D=Rua%20Caviana&transaction%5Bbilling%5D%5Baddress%5D%5Bcomplementary%5D=&transaction%5Bbilling%5D%5Baddress%5D%5Bstreet_number%5D=111&transaction%5Bbilling%5D%5Baddress%5D%5Bneighborhood%5D=Taquara&transaction%5Bbilling%5D%5Baddress%5D%5Bcity%5D=Rio%20de%20Janeiro&transaction%5Bbilling%5D%5Baddress%5D%5Bstate%5D=RJ&transaction%5Bbilling%5D%5Baddress%5D%5Bzipcode%5D=22730140&transaction%5Bbilling%5D%5Baddress%5D%5Bcountry%5D=br&transaction%5Bbilling%5D%5Baddress%5D%5Bid%5D=3180962&transaction%5Bshipping%5D=&transaction%5Bitems%5D%5B0%5D%5Bobject%5D=item&transaction%5Bitems%5D%5B0%5D%5Bid%5D=Contrib-Unica-a4d27081-f523-4138-b569-c2b7ed61c0bf&transaction%5Bitems%5D%5B0%5D%5Btitle%5D=Contribui%C3%A7%C3%A3o%20%C3%BAnica%20Rafael%20Gonsalves%20Rozendo%2011.0&transaction%5Bitems%5D%5B0%5D%5Bunit_price%5D=1100&transaction%5Bitems%5D%5B0%5D%5Bquantity%5D=1&transaction%5Bitems%5D%5B0%5D%5Bcategory%5D=&transaction%5Bitems%5D%5B0%5D%5Btangible%5D=false&transaction%5Bitems%5D%5B0%5D%5Bvenue%5D=&transaction%5Bitems%5D%5B0%5D%5Bdate%5D=&transaction%5Bcard%5D%5Bobject%5D=card&transaction%5Bcard%5D%5Bid%5D=card_ckci77u680l5p686dm6squg2o&transaction%5Bcard%5D%5Bdate_created%5D=2020-07-11T22%3A06%3A24.128Z&transaction%5Bcard%5D%5Bdate_updated%5D=2020-07-11T22%3A06%3A24.754Z&transaction%5Bcard%5D%5Bbrand%5D=mastercard&transaction%5Bcard%5D%5Bholder_name%5D=TESTEE&transaction%5Bcard%5D%5Bfirst_digits%5D=516277&transaction%5Bcard%5D%5Blast_digits%5D=4589&transaction%5Bcard%5D%5Bcountry%5D=UNITED%20STATES%20OF%20AMERICA&transaction%5Bcard%5D%5Bfingerprint%5D=ckci76w4g5anv0j646lz65yco&transaction%5Bcard%5D%5Bvalid%5D=true&transaction%5Bcard%5D%5Bexpiration_date%5D=0422&transaction%5Bsplit_rules%5D=&transaction%5Breference_key%5D=&transaction%5Bdevice%5D=&transaction%5Blocal_transaction_id%5D=&transaction%5Blocal_time%5D=&transaction%5Bfraud_covered%5D=false&transaction%5Bfraud_reimbursed%5D=&transaction%5Border_id%5D=&transaction%5Brisk_level%5D=very_low&transaction%5Breceipt_url%5D=&transaction%5Bpayment%5D=&transaction%5Baddition%5D=&transaction%5Bdiscount%5D=&transaction%5Bprivate_label%5D=",
  ],
])("pagarme valid postback", async (signatureHeader, rawBody) => {
  const validPostback = await validatePagarmePostback({
    requestBodyText: rawBody,
    requestSignatureHeader: signatureHeader,
  });
  expect(validPostback).toBe(true);
});

test.each([
  ["sha1=d151bbee8ca5d292b7f0acf893af136cce54f4cf", "invalidBody"],
  [
    "sha1=invalidSignature",
    "id=9194562&fingerprint=b6fd45e84ce93e22966bb758d0bb16ad923490c3&event=transaction_status_changed&old_status=processing&desired_status=paid&current_status=paid&object=transaction&transaction%5Bobject%5D=transaction&transaction%5Bstatus%5D=paid&transaction%5Brefuse_reason%5D=&transaction%5Bstatus_reason%5D=acquirer&transaction%5Bacquirer_response_code%5D=0000&transaction%5Bacquirer_name%5D=pagarme&transaction%5Bacquirer_id%5D=5b70aea582295e517d69a124&transaction%5Bauthorization_code%5D=419275&transaction%5Bsoft_descriptor%5D=&transaction%5Btid%5D=9194562&transaction%5Bnsu%5D=9194562&transaction%5Bdate_created%5D=2020-07-11T22%3A06%3A24.141Z&transaction%5Bdate_updated%5D=2020-07-11T22%3A06%3A24.651Z&transaction%5Bamount%5D=1100&transaction%5Bauthorized_amount%5D=1100&transaction%5Bpaid_amount%5D=1100&transaction%5Brefunded_amount%5D=0&transaction%5Binstallments%5D=1&transaction%5Bid%5D=9194562&transaction%5Bcost%5D=120&transaction%5Bcard_holder_name%5D=TESTEE&transaction%5Bcard_last_digits%5D=4589&transaction%5Bcard_first_digits%5D=516277&transaction%5Bcard_brand%5D=mastercard&transaction%5Bcard_pin_mode%5D=&transaction%5Bcard_magstripe_fallback%5D=false&transaction%5Bcvm_pin%5D=false&transaction%5Bpostback_url%5D=https%3A%2F%2F94ecb4f830a5ed6d3bed1a54aed910bf.m.pipedream.net%2F&transaction%5Bpayment_method%5D=credit_card&transaction%5Bcapture_method%5D=ecommerce&transaction%5Bantifraud_score%5D=&transaction%5Bboleto_url%5D=&transaction%5Bboleto_barcode%5D=&transaction%5Bboleto_expiration_date%5D=&transaction%5Breferer%5D=api_key&transaction%5Bip%5D=179.34.147.83&transaction%5Bsubscription_id%5D=&transaction%5Bphone%5D=&transaction%5Baddress%5D=&transaction%5Bcustomer%5D%5Bobject%5D=customer&transaction%5Bcustomer%5D%5Bid%5D=3417607&transaction%5Bcustomer%5D%5Bexternal_id%5D=1&transaction%5Bcustomer%5D%5Btype%5D=individual&transaction%5Bcustomer%5D%5Bcountry%5D=br&transaction%5Bcustomer%5D%5Bdocument_number%5D=&transaction%5Bcustomer%5D%5Bdocument_type%5D=cpf&transaction%5Bcustomer%5D%5Bname%5D=Rafael%20Gonsalves%20Rozendo&transaction%5Bcustomer%5D%5Bemail%5D=rafael.g.rozendo%40gmail.com&transaction%5Bcustomer%5D%5Bphone_numbers%5D%5B0%5D=%2B5521994457010&transaction%5Bcustomer%5D%5Bborn_at%5D=&transaction%5Bcustomer%5D%5Bbirthday%5D=&transaction%5Bcustomer%5D%5Bgender%5D=&transaction%5Bcustomer%5D%5Bdate_created%5D=2020-07-11T22%3A06%3A24.068Z&transaction%5Bcustomer%5D%5Bdocuments%5D%5B0%5D%5Bobject%5D=document&transaction%5Bcustomer%5D%5Bdocuments%5D%5B0%5D%5Bid%5D=doc_ckci77u4u0l5o686ddq5pajec&transaction%5Bcustomer%5D%5Bdocuments%5D%5B0%5D%5Btype%5D=cpf&transaction%5Bcustomer%5D%5Bdocuments%5D%5B0%5D%5Bnumber%5D=15284225708&transaction%5Bbilling%5D%5Bobject%5D=billing&transaction%5Bbilling%5D%5Bid%5D=1457941&transaction%5Bbilling%5D%5Bname%5D=Rafael%20Gonsalves%20Rozendo&transaction%5Bbilling%5D%5Baddress%5D%5Bobject%5D=address&transaction%5Bbilling%5D%5Baddress%5D%5Bstreet%5D=Rua%20Caviana&transaction%5Bbilling%5D%5Baddress%5D%5Bcomplementary%5D=&transaction%5Bbilling%5D%5Baddress%5D%5Bstreet_number%5D=111&transaction%5Bbilling%5D%5Baddress%5D%5Bneighborhood%5D=Taquara&transaction%5Bbilling%5D%5Baddress%5D%5Bcity%5D=Rio%20de%20Janeiro&transaction%5Bbilling%5D%5Baddress%5D%5Bstate%5D=RJ&transaction%5Bbilling%5D%5Baddress%5D%5Bzipcode%5D=22730140&transaction%5Bbilling%5D%5Baddress%5D%5Bcountry%5D=br&transaction%5Bbilling%5D%5Baddress%5D%5Bid%5D=3180962&transaction%5Bshipping%5D=&transaction%5Bitems%5D%5B0%5D%5Bobject%5D=item&transaction%5Bitems%5D%5B0%5D%5Bid%5D=Contrib-Unica-a4d27081-f523-4138-b569-c2b7ed61c0bf&transaction%5Bitems%5D%5B0%5D%5Btitle%5D=Contribui%C3%A7%C3%A3o%20%C3%BAnica%20Rafael%20Gonsalves%20Rozendo%2011.0&transaction%5Bitems%5D%5B0%5D%5Bunit_price%5D=1100&transaction%5Bitems%5D%5B0%5D%5Bquantity%5D=1&transaction%5Bitems%5D%5B0%5D%5Bcategory%5D=&transaction%5Bitems%5D%5B0%5D%5Btangible%5D=false&transaction%5Bitems%5D%5B0%5D%5Bvenue%5D=&transaction%5Bitems%5D%5B0%5D%5Bdate%5D=&transaction%5Bcard%5D%5Bobject%5D=card&transaction%5Bcard%5D%5Bid%5D=card_ckci77u680l5p686dm6squg2o&transaction%5Bcard%5D%5Bdate_created%5D=2020-07-11T22%3A06%3A24.128Z&transaction%5Bcard%5D%5Bdate_updated%5D=2020-07-11T22%3A06%3A24.754Z&transaction%5Bcard%5D%5Bbrand%5D=mastercard&transaction%5Bcard%5D%5Bholder_name%5D=TESTEE&transaction%5Bcard%5D%5Bfirst_digits%5D=516277&transaction%5Bcard%5D%5Blast_digits%5D=4589&transaction%5Bcard%5D%5Bcountry%5D=UNITED%20STATES%20OF%20AMERICA&transaction%5Bcard%5D%5Bfingerprint%5D=ckci76w4g5anv0j646lz65yco&transaction%5Bcard%5D%5Bvalid%5D=true&transaction%5Bcard%5D%5Bexpiration_date%5D=0422&transaction%5Bsplit_rules%5D=&transaction%5Breference_key%5D=&transaction%5Bdevice%5D=&transaction%5Blocal_transaction_id%5D=&transaction%5Blocal_time%5D=&transaction%5Bfraud_covered%5D=false&transaction%5Bfraud_reimbursed%5D=&transaction%5Border_id%5D=&transaction%5Brisk_level%5D=very_low&transaction%5Breceipt_url%5D=&transaction%5Bpayment%5D=&transaction%5Baddition%5D=&transaction%5Bdiscount%5D=&transaction%5Bprivate_label%5D=",
  ],
])("pagarme invalid postback", async (signatureHeader, rawBody) => {
  const validPostback = await validatePagarmePostback({
    requestBodyText: rawBody,
    requestSignatureHeader: signatureHeader,
  });
  expect(validPostback).toBe(false);
});

export {};
