import { useRef, useState } from 'react';
import { Button, FlatList, Text, View, StyleSheet } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { TrueSheet } from '@lodev09/react-native-true-sheet';

const DATA = Array.from({ length: 12 }, (_, i) => ({ id: String(i), title: `Row ${i + 1}` }));

type Variant = {
  label: string;
  list: 'flash' | 'flat';
  detents: any[];
  sheetFlex?: boolean;
  listStyle?: object;
  contentContainerStyle?: object;
  noScrollableRef?: boolean;
  wrapHeight?: number;
};

const VARIANTS: Variant[] = [
  { label: 'A: auto + FlashList (BUG)', list: 'flash', detents: ['auto'] },
  { label: 'B: auto + FlatList (ok)', list: 'flat', detents: ['auto'] },
  { label: 'C: [0.6, 1] + flex:1 + FlashList (ok)', list: 'flash', detents: [0.6, 1], sheetFlex: true },
  { label: 'D: auto + FlashList + style flexGrow', list: 'flash', detents: ['auto'], listStyle: { flexGrow: 1 } },
  { label: 'E: auto + FlashList + estimatedItemSize-like contentContainerStyle', list: 'flash', detents: ['auto'], contentContainerStyle: { paddingBottom: 8 } },
  { label: 'F: auto + FlashList + fixed height 400 list', list: 'flash', detents: ['auto'], listStyle: { height: 400 } },
  { label: 'G: auto + FlashList, NO scrollableRef', list: 'flash', detents: ['auto'], noScrollableRef: true },
  { label: 'H: [0.6, 1] + FlashList, no flex:1', list: 'flash', detents: [0.6, 1] },
  { label: 'I: auto + View height 400 > FlashList flex:1', list: 'flash', detents: ['auto'], wrapHeight: 400, listStyle: { flex: 1 } },
];

const Row = ({ title }: { title: string }) => (
  <View style={styles.row}><Text>{title}</Text></View>
);

export default function App() {
  const sheet = useRef<TrueSheet>(null);
  const scrollRef = useRef<any>(null);
  const [v, setV] = useState<Variant>(VARIANTS[0]);

  const open = async (variant: Variant) => {
    setV(variant);
    // let detents/props apply before presenting
    setTimeout(() => sheet.current?.present(), 50);
  };

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>True Sheet beta.25 + FlashList 2.3.3</Text>
      {VARIANTS.map((x) => (
        <Button key={x.label} title={x.label} onPress={() => open(x)} />
      ))}
      <TrueSheet
        key={v.label}
        ref={sheet}
        detents={v.detents}
        scrollableRef={v.noScrollableRef ? undefined : scrollRef}
        style={v.sheetFlex ? { flex: 1 } : undefined}
      >
        <View style={v.wrapHeight ? { height: v.wrapHeight } : undefined}>
        {v.list === 'flash' ? (
          <FlashList
            ref={scrollRef}
            data={DATA}
            keyExtractor={(i) => i.id}
            renderItem={({ item }) => <Row title={item.title} />}
            style={v.listStyle}
            contentContainerStyle={v.contentContainerStyle}
          />
        ) : (
          <FlatList
            ref={scrollRef}
            data={DATA}
            keyExtractor={(i) => i.id}
            renderItem={({ item }) => <Row title={item.title} />}
          />
        )}
        </View>
      </TrueSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, paddingTop: 80, paddingHorizontal: 16, gap: 8 },
  title: { fontWeight: '700', fontSize: 16 },
  row: { height: 56, justifyContent: 'center', paddingHorizontal: 16, borderBottomWidth: StyleSheet.hairlineWidth, borderColor: '#ccc' },
});
