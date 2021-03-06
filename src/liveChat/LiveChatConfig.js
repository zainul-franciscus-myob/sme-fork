import chatIcon from './icon-chat.svg';

const liveChatConfig = (
  businessId,
  businessName,
  userEmail,
  region,
  serialNumber
) => {
  // eslint-disable-next-line no-underscore-dangle
  if (!window._genesys) window._genesys = {};
  // eslint-disable-next-line no-underscore-dangle
  if (!window._gt) window._gt = [];

  // eslint-disable-next-line no-underscore-dangle
  window._genesys.widgets = {
    main: {
      theme: 'myob',
      themes: {
        myob: 'cx-theme-myob',
      },
      i18n: {
        en: {
          webchat: {
            ChatButton: 'Live Chat',
            ChatFormSubmit: 'Next',
            ChatFormPlaceholderNickName: "What's your name?",
          },
        },
      },
      downloadGoogleFont: false,
    },
    webchat: {
      dataURL: 'https://eservices.myob.com/genesys/2/chat/myob2/',
      apikey: '',
      userData: {
        opm_parameter_group:
          region === 'au' ? 'SME Trails Chat' : 'SME-Trial-NZ',
        businessId,
        businessName,
        userEmail,
        region,
        serialNumber,
      },
      emojis: true,
      emojiList:
        '๐คฉ:Star-Struck;๐คช:Zany Face;๐คญ:Face With Hand Over Mouth;๐คซ:Shushing Face;๐คจ:Face With Raised Eyebrow;โฟ:Bitcoin;๐คฎ:Face Vomiting;๐คฏ:Exploding Head;๐ง:Face With Monocle;๐คฌ:Face With Symbols on Mouth;๐งก:Orange Heart;๐ค:Love-You Gesture;๐คฒ:Palms Up Together;๐ง :Brain;๐ง:Child;๐ง:Person;๐ง:Man: Beard;๐ง:Older Person;๐ง:Woman With Headscarf;๐คฑ:Breast-Feeding;๐ง:Mage;๐ง:Fairy;๐ง:Vampire;๐ง:Merperson;๐ง:Elf;๐ง:Genie;๐ง:Zombie;๐ง:Person in Steamy Room;๐ง:Person Climbing;๐ง:Person in Lotus Position;๐ฆ:Zebra;๐ฆ:Giraffe;๐ฆ:Hedgehog;๐ฆ:Sauropod;๐ฆ:T-Rex;๐ฆ:Cricket;๐ฅฅ:Coconut;๐ฅฆ:Broccoli;๐ฅจ:Pretzel;๐ฅฉ:Cut of Meat;๐ฆ๐บ:Australia Day;๐ซ๐ท:Bastille Day;๐:Birthday;๐:Black Friday;๐จ๐ฆ:Canada Day;๐ง๐ท:Carnaval;๐:Chinese New Year;๐:Christmas;๐ฒ๐ฝ:Cinco de Mayo;๐ฏ:Diwali;๐จ๐ณ:Dragon Boat Festival;๐ฐ:Easter;๐ฅ:Emoji Movie;๐:Fall / Autumn;๐จ:Fatherโs Day;๐ช:Festivus;๐:Graduation;๐ฅ:Guy Fawkes;๐:Halloween;๐:Hanukkah;๐:Hearts;๐:Holi;๐บ๐ธ:Independence Day;๐ฉ:Motherโs Day;๐:New Yearโs Eve;๐:Olympics;๐ณ๏ธโ๐:Pride;๐:Queenโs Birthday;โช:Ramadan;๐ฑ:Spring;โ:St Patrickโs Day;โ:Summer;๐:Super Bowl;๐ฆ:Thanksgiving;๐:Valentineโs Day;๐ฐ:Wedding / Marriage;โ:Winter;๐ฟ:Winter Olympics;โฝ:World Cup;๐:World Emoji Day;',
      chatButton: {
        enabled: true,
        openDelay: 100,
        effectDuration: 100,
        template: `
          <div class="cx-widget cx-webchat-chat-button" data-message="ChatButton" data-gcb-service-node="true">
            <img src=${chatIcon} alt="live chat" width="25" height="25" />
          </div>
        `,
      },
      form: {
        wrapper: '<div></div>',
        inputs: [
          {
            custom:
              '' +
              '<p>' +
              "We're here to help during your free trial of MYOB Essentials. " +
              'All we need to get started is your first name.' +
              '</p>',
          },
          {
            id: 'nickname',
            name: 'nickname',
            placeholder: '@i18n:webchat.ChatFormPlaceholderNickName',
            autofocus: true,
            wrapper: '<span>{input}</span>',
          },
        ],
      },
    },
  };
};

export default liveChatConfig;
