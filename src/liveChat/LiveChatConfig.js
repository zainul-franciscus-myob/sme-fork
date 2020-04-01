import chatIcon from './icon-chat.svg';

const liveChatConfig = (
  businessId,
  businessName,
  businessRole,
  email,
  region,
  serialNumber,
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
        opm_parameter_group: 'SME Trails Chat',
        businessId,
        businessName,
        businessRole,
        email,
        region,
        serialNumber,
      },
      emojis: true,
      emojiList: '🤩:Star-Struck;🤪:Zany Face;🤭:Face With Hand Over Mouth;🤫:Shushing Face;🤨:Face With Raised Eyebrow;₿:Bitcoin;🤮:Face Vomiting;🤯:Exploding Head;🧐:Face With Monocle;🤬:Face With Symbols on Mouth;🧡:Orange Heart;🤟:Love-You Gesture;🤲:Palms Up Together;🧠:Brain;🧒:Child;🧑:Person;🧔:Man: Beard;🧓:Older Person;🧕:Woman With Headscarf;🤱:Breast-Feeding;🧙:Mage;🧚:Fairy;🧛:Vampire;🧜:Merperson;🧝:Elf;🧞:Genie;🧟:Zombie;🧖:Person in Steamy Room;🧗:Person Climbing;🧘:Person in Lotus Position;🦓:Zebra;🦒:Giraffe;🦔:Hedgehog;🦕:Sauropod;🦖:T-Rex;🦗:Cricket;🥥:Coconut;🥦:Broccoli;🥨:Pretzel;🥩:Cut of Meat;🇦🇺:Australia Day;🇫🇷:Bastille Day;🎂:Birthday;🛍:Black Friday;🇨🇦:Canada Day;🇧🇷:Carnaval;🐉:Chinese New Year;🎅:Christmas;🇲🇽:Cinco de Mayo;🕯:Diwali;🇨🇳:Dragon Boat Festival;🐰:Easter;🎥:Emoji Movie;🍂:Fall / Autumn;👨:Father’s Day;💪:Festivus;🎓:Graduation;🔥:Guy Fawkes;🎃:Halloween;🕎:Hanukkah;💕:Hearts;🕉:Holi;🇺🇸:Independence Day;👩:Mother’s Day;🎊:New Year’s Eve;🏊:Olympics;🏳️‍🌈:Pride;👑:Queen’s Birthday;☪:Ramadan;🌱:Spring;☘:St Patrick’s Day;☀:Summer;🏈:Super Bowl;🦃:Thanksgiving;💘:Valentine’s Day;👰:Wedding / Marriage;⛄:Winter;🎿:Winter Olympics;⚽:World Cup;🌎:World Emoji Day;',
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
            custom: ''
              + '<p>'
              + 'We\'re here to help during your free trial of MYOB Essentials. '
              + 'All we need to get started is your first name.'
              + '</p>',
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
