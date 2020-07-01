import {
  CREATE_TEMPLATE,
  LOAD_NEW_TEMPLATE,
  LOAD_PAY_DIRECT,
  LOAD_TEMPLATE,
  REMOVE_TEMPLATE_IMAGE,
  SET_ALERT,
  SET_LOADING_STATE,
  SET_MODAL_TYPE,
  SET_PAY_DIRECT_LOADING_STATE,
  SET_TEMP_FILE,
  UPDATE_TEMPLATE,
  UPDATE_TEMPLATE_IMAGE,
  UPDATE_TEMPLATE_OPTION,
} from '../TemplateIntents';
import { HeaderBusinessDetailStyle } from '../templateOptions';
import { SET_INITIAL_STATE } from '../../../SystemIntents';
import { TEMPLATE_UPDATED } from '../../../common/types/MessageTypes';
import ModalTypes from '../ModalTypes';
import TemplateModule from '../TemplateModule';
import TestIntegration from '../../../integration/TestIntegration';
import TestStore from '../../../store/TestStore';
import createTemplateDispatcher from '../createTemplateDispatcher';
import createTemplateIntegrator from '../createTemplateIntegrator';
import templateReducer from '../templateReducer';

describe('TemplateModule', () => {
  const withMockFileReader = (test) => {
    const original = FileReader;
    window.FileReader = class {
        readAsDataURL = () => {
          this.onload({
            target: {
              result: '🦵',
            },
          });
        }
    };

    test();

    window.FileReader = original;
  };

  const setup = () => {
    const setRootView = () => {};
    const store = new TestStore(templateReducer);
    const integration = new TestIntegration();

    const module = new TemplateModule({ integration, setRootView });
    module.store = store;

    module.dispatcher = createTemplateDispatcher(store);
    module.integrator = createTemplateIntegrator(store, integration);

    return { module, store, integration };
  };

  const setupWithNew = () => {
    const toolbox = setup();
    const { module, store, integration } = toolbox;

    module.run({
      templateName: undefined,
      businessId: 'g-u-i-d',
      region: 'au',
    });

    store.resetActions();
    integration.resetRequests();

    return toolbox;
  };

  const setupWithExisting = () => {
    const toolbox = setup();
    const { module, store, integration } = toolbox;

    module.run({
      templateName: '👽',
      businessId: 'g-u-i-d',
      region: 'au',
    });

    store.resetActions();
    integration.resetRequests();

    return toolbox;
  };


  const setupWithHeaderBusinessDetailStyle = (headerBusinessDetailStyle) => {
    const toolbox = setupWithNew();
    const { module, store } = toolbox;

    const data = {
      key: 'headerBusinessDetailsStyle',
      value: headerBusinessDetailStyle,
    };

    module.updateTemplateOption(data);

    expect(store.getActions()).toEqual([
      {
        intent: UPDATE_TEMPLATE_OPTION,
        ...data,
      },
    ]);

    store.resetActions();

    return toolbox;
  };


  describe('run', () => {
    [
      {
        name: 'new',
        templateName: undefined,
        intent: LOAD_NEW_TEMPLATE,
      },
      {
        name: 'existing',
        templateName: '👽',
        intent: LOAD_TEMPLATE,
      },
    ].forEach((test) => {
      describe(`when ${test.name}`, () => {
        describe('when au', () => {
          it('successfully load', () => {
            const { module, store, integration } = setup();

            module.run({
              templateName: test.templateName,
              region: 'au',
            });

            expect(store.getActions()).toEqual([
              {
                intent: SET_INITIAL_STATE,
                context: {
                  templateName: test.templateName,
                  region: 'au',
                },
              },
              {
                intent: SET_LOADING_STATE,
                isLoading: true,
              },
              {
                intent: SET_LOADING_STATE,
                isLoading: false,
              },
              expect.objectContaining({
                intent: test.intent,
              }),
              {
                intent: SET_PAY_DIRECT_LOADING_STATE,
                isLoading: true,
              },
              {
                intent: SET_PAY_DIRECT_LOADING_STATE,
                isLoading: false,
              },
              expect.objectContaining({
                intent: LOAD_PAY_DIRECT,
              }),
            ]);

            expect(integration.getRequests()).toEqual([
              expect.objectContaining({
                intent: test.intent,
              }),
              expect.objectContaining({
                intent: LOAD_PAY_DIRECT,
              }),
            ]);
          });

          it('fails to load', () => {
            const { module, store, integration } = setup();
            integration.mapFailure(test.intent);
            integration.mapFailure(LOAD_PAY_DIRECT);

            module.run({
              templateName: test.templateName,
              region: 'au',
            });

            expect(store.getActions()).toEqual([
              {
                intent: SET_INITIAL_STATE,
                context: {
                  templateName: test.templateName,
                  region: 'au',
                },
              },
              {
                intent: SET_LOADING_STATE,
                isLoading: true,
              },
              {
                intent: SET_LOADING_STATE,
                isLoading: false,
              },
              {
                intent: SET_PAY_DIRECT_LOADING_STATE,
                isLoading: true,
              },
              {
                intent: SET_PAY_DIRECT_LOADING_STATE,
                isLoading: false,
              },
            ]);

            expect(integration.getRequests()).toEqual([
              expect.objectContaining({
                intent: test.intent,
              }),
              expect.objectContaining({
                intent: LOAD_PAY_DIRECT,
              }),
            ]);
          });
        });

        describe('when nz', () => {
          it('successfully load', () => {
            const { module, store, integration } = setup();

            module.run({
              templateName: test.templateName,
              region: 'nz',
            });

            expect(store.getActions()).toEqual([
              {
                intent: SET_INITIAL_STATE,
                context: {
                  templateName: test.templateName,
                  region: 'nz',
                },
              },
              {
                intent: SET_LOADING_STATE,
                isLoading: true,
              },
              {
                intent: SET_LOADING_STATE,
                isLoading: false,
              },
              expect.objectContaining({
                intent: test.intent,
              }),
            ]);

            expect(integration.getRequests()).toEqual([
              expect.objectContaining({
                intent: test.intent,
              }),
            ]);
          });

          it('fails to load', () => {
            const { module, store, integration } = setup();
            integration.mapFailure(test.intent);
            integration.mapFailure(LOAD_PAY_DIRECT);

            module.run({
              templateName: test.templateName,
              region: 'nz',
            });

            expect(store.getActions()).toEqual([
              {
                intent: SET_INITIAL_STATE,
                context: {
                  templateName: test.templateName,
                  region: 'nz',
                },
              },
              {
                intent: SET_LOADING_STATE,
                isLoading: true,
              },
              {
                intent: SET_LOADING_STATE,
                isLoading: false,
              },
            ]);

            expect(integration.getRequests()).toEqual([
              expect.objectContaining({
                intent: test.intent,
              }),
            ]);
          });
        });
      });
    });
  });

  describe('selectFile', () => {
    [
      {
        headerBusinessDetailStyle: HeaderBusinessDetailStyle.fullWidthHeaderImage,
        imageKey: 'headerImage',
      },
      {
        headerBusinessDetailStyle: HeaderBusinessDetailStyle.logoAndBusinessDetails,
        imageKey: 'logoImage',
      },
    ].forEach((test) => {
      describe(`when ${test.headerBusinessDetailStyle}`, () => {
        it('selects file when no file', () => {
          withMockFileReader(() => {
            const { module, store } = setupWithHeaderBusinessDetailStyle(
              test.headerBusinessDetailStyle,
            );

            module.selectFile(new Blob());

            expect(store.getActions()).toEqual([
              {
                intent: UPDATE_TEMPLATE_OPTION,
                key: test.imageKey,
                value: '🦵',
              },
            ]);
          });
        });
      });
    });
  });

  describe('handleModalUnsave', () => {
    [
      {
        headerBusinessDetailsStyle: HeaderBusinessDetailStyle.fullWidthHeaderImage,
        modalType: ModalTypes.deleteImage,
      },
      {
        headerBusinessDetailsStyle: HeaderBusinessDetailStyle.logoAndBusinessDetails,
        modalType: ModalTypes.deleteLogo,
      },
    ].forEach((test) => {
      describe(`when has ${test.HeaderBusinessDetailStyle} file`, () => {
        it('removes file', () => {
          const setupWithFile = () => {
            const toolbox = setupWithHeaderBusinessDetailStyle(test.headerBusinessDetailsStyle);
            const { module, store } = toolbox;

            module.selectFile(new Blob());

            store.resetActions();

            return toolbox;
          };

          withMockFileReader(() => {
            const { module, store } = setupWithFile();

            module.removeFile();
            module.handleModalUnsave(test.modalType);

            expect(store.getActions()).toEqual([
              {
                intent: SET_MODAL_TYPE,
                modalType: test.modalType,
              },
              {
                intent: REMOVE_TEMPLATE_IMAGE,
              },
              {
                intent: SET_MODAL_TYPE,
                modalType: '',
              },
            ]);
          });
        });
      });
    });
  });

  describe('handleModalSave', () => {
    [
      {
        headerBusinessDetailsStyle: HeaderBusinessDetailStyle.fullWidthHeaderImage,
        modalType: ModalTypes.changeImage,
      },
      {
        headerBusinessDetailsStyle: HeaderBusinessDetailStyle.logoAndBusinessDetails,
        modalType: ModalTypes.changeLogo,
      },
    ].forEach((test) => {
      describe(`when has ${test.HeaderBusinessDetailStyle} file`, () => {
        const setupWithFile = () => {
          const toolbox = setupWithHeaderBusinessDetailStyle(test.headerBusinessDetailsStyle);
          const { module, store } = toolbox;

          module.selectFile(new Blob());

          store.resetActions();

          return toolbox;
        };

        it('removes file', () => {
          withMockFileReader(() => {
            const { module, store } = setupWithFile();

            module.selectFile(new Blob());
            module.handleModalSave(test.modalType);

            expect(store.getActions()).toEqual([
              {
                intent: SET_MODAL_TYPE,
                modalType: test.modalType,
              },
              {
                intent: SET_TEMP_FILE,
                file: '🦵',
              },
              {
                intent: UPDATE_TEMPLATE_IMAGE,
              },
              {
                intent: SET_MODAL_TYPE,
                modalType: '',
              },
            ]);
          });
        });
      });
    });
  });

  describe('saveTemplate', () => {
    [
      {
        name: 'new',
        setup: setupWithNew,
        intent: CREATE_TEMPLATE,
      },
      {
        name: 'existing',
        setup: setupWithExisting,
        intent: UPDATE_TEMPLATE,
      },
    ].forEach((test) => {
      describe(`when ${test.name}`, () => {
        it('successfully save', () => {
          const { module, store, integration } = test.setup();
          module.pushMessage = jest.fn();

          module.saveTemplate();

          expect(store.getActions()).toEqual([
            {
              intent: SET_LOADING_STATE,
              isLoading: true,
            },
          ]);
          expect(integration.getRequests()).toEqual([
            expect.objectContaining({
              intent: test.intent,
            }),
          ]);
          expect(module.pushMessage).toHaveBeenCalledWith({
            type: TEMPLATE_UPDATED,
            content: expect.any(String),
          });
          expect(window.location.href).toContain('/#/au/g-u-i-d/salesSettings?selectedTab=templates');
        });

        it('fails to save', () => {
          const { module, store, integration } = test.setup();
          integration.mapFailure(test.intent);

          module.saveTemplate();

          expect(store.getActions()).toEqual([
            {
              intent: SET_LOADING_STATE,
              isLoading: true,
            },
            {
              intent: SET_LOADING_STATE,
              isLoading: false,
            },
            {
              intent: SET_ALERT,
              alert: {
                type: 'danger',
                message: 'fails',
              },
            },
          ]);
          expect(integration.getRequests()).toEqual([
            expect.objectContaining({
              intent: test.intent,
            }),
          ]);
        });
      });
    });
  });
});
