import {createReducer, nanoid} from '@reduxjs/toolkit';

import {addPopup, removePopup, toggleSettingsMenu, toggleWalletModal, updateBlockNumber,} from './actions';
import {INITIAL_APP_STATE} from '../../utils/constants';

export default createReducer(INITIAL_APP_STATE, (builder) =>
  builder
    .addCase(updateBlockNumber, (state, action) => {
      const {chainId, blockNumber} = action.payload;
      if (typeof state.blockNumber[chainId] !== 'number') {
        state.blockNumber[chainId] = blockNumber;
      } else {
        state.blockNumber[chainId] = Math.max(blockNumber, state.blockNumber[chainId]);
      }
    })
    .addCase(toggleWalletModal, (state) => {
      state.walletModalOpen = !state.walletModalOpen;
    })
    .addCase(toggleSettingsMenu, (state) => {
      state.settingsMenuOpen = !state.settingsMenuOpen;
    })
    .addCase(addPopup, (state, {payload: {content, key, removeAfterMs = 15000}}) => {
      state.popupList = (key
          ? state.popupList.filter((popup: any) => popup.key !== key)
          : state.popupList
      ).concat([
        {
          key: key || nanoid(),
          show: true,
          content,
          removeAfterMs,
        },
      ]);
    })
    .addCase(removePopup, (state, {payload: {key}}) => {
      state.popupList.forEach((p: any) => {
        if (p.key === key) {
          p.show = false;
        }
      });
    }),
);
