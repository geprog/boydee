import { config, shallowMount } from '@vue/test-utils';
import { TranslateResult } from 'vue-i18n';

import HelloWorld from '@/components/HelloWorld.vue';
import i18n from '@/i18n';

if (config.mocks) {
  config.mocks['i18n'] = i18n;
  config.mocks['$t'] = (key: string): TranslateResult => {
    // eslint-disable-next-line @intlify/vue-i18n/no-dynamic-keys
    return i18n.t(key);
  };
}

describe('HelloWorld.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message';
    const wrapper = shallowMount(HelloWorld, {
      i18n,
      propsData: { msg },
    });
    expect(wrapper.text()).toMatch(msg);
  });
});
