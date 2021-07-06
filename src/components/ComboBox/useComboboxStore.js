import { createStore, setStoreValue } from './store/createStore';

export const ComboboxKey = {
    TAG: 'tag',
    SLASH_COMMAND: 'slash_command',
}

export const useComboboxStore = createStore()((set) => ({
    key: ComboboxKey.SLASH_COMMAND,
    setKey: setStoreValue(set, 'key', 'setKey'),

    maxSuggestions: 10,
    setMaxSuggestions: setStoreValue(set, 'maxSuggestions', 'setMaxSuggestions'),

    search: '',
    setSearch: setStoreValue(set, 'search', 'setSearch'),

    items: [],
    setItems: setStoreValue(set, 'items', 'setItems'),

    targetRange: null,
    setTargetRange: setStoreValue(set, 'targetRange', 'setTargetRange'),

    itemIndex: 0,
    setItemIndex: setStoreValue(set, 'itemIndex', 'setItemIndex'),

    combobox: null,
    setCombobox: setStoreValue(set, 'combobox', 'setCombobox'),

    closeMenu: () => {
        set((state) => {
            state.targetRange = null;
            state.items = [];
            state.search = '';
            state.itemIndex = 0;
        });
    },
}));