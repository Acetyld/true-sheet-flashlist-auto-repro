# True Sheet v4: `detents={['auto']}` + FlashList renders a blank sheet

Minimal repro for @lodev09/react-native-true-sheet 4.0.0-beta.25 with @shopify/flash-list 2.3.3
(Expo SDK 58, RN 0.88.0, New Architecture, iOS 27 simulator).

```
npm install
npx expo prebuild --platform ios
npx expo run:ios
```

Tap the buttons in `App.tsx`; each opens a sheet with a different setup. Variant A (`auto` + FlashList) is blank:
the rows are in the accessibility tree but nothing is drawn. See `shots/`.

| Variant | Result |
|---|---|
| A: `auto` + FlashList | blank |
| B: `auto` + FlatList | ok |
| C: `[0.6, 1]` + sheet `flex: 1` + FlashList | ok |
| D: A + FlashList `flexGrow: 1` | blank |
| E: A + `contentContainerStyle` | blank |
| F: A + FlashList `height: 400` | blank |
| G: A without `scrollableRef` | blank |
| H: `[0.6, 1]` without `flex: 1` | blank |
| I: A inside `<View style={{height: 400}}>` with FlashList `flex: 1` | ok |
