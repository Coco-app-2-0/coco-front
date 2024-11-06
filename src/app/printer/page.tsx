'use client'
import React, {  } from 'react'
// import Printer from "esc-pos-printer";
import { Button } from '@mui/material'

// import { usePrinter } from '@ombori/ga-thermal-printer-react';
// import { useHeartbeat } from '@ombori/ga-messaging';


const printer = () => {
  // const receipt = (
  //   <Printer type="epson" width={42} characterSet="korea">
  //     <Text size={{ width: 2, height: 2 }}>9,500원</Text>
  //     <Text bold={true}>Texto en taka-taka</Text>
  //     <Br />
  //     <Line />
  //     <Row left="결제방법" right="체크카드" />
  //     <Row left="카드번호" right="123456**********" />
  //     <Row left="할부기간" right="일시불" />
  //     <Row left="결제금액" right="9,500" />
  //     <Row left="부가세액" right="863" />
  //     <Row left="공급가액" right="8,637" />
  //     <Line />
  //     <Row left="맛있는 옥수수수염차 X 2" right="11,000" />
  //     <Text>옵션1(500)/옵션2/메모</Text>
  //     <Row left="(-) 할인" right="- 500" />
  //     <Br />
  //     <Line />
  //     <Row left="합계" right="9,500" />
  //     <Row left="(-) 할인 2%" right="- 1,000" />
  //     <Line />
  //     <Row left="대표" right="김대표" />
  //     <Row left="사업자등록번호" right="000-00-00000" />
  //     <Row left="대표번호" right="0000-0000" />
  //     <Row left="주소" right="어디시 어디구 어디동 몇동몇호" />
  //     <Line />
  //     <Br />
  //     <Text align="center">Wifi: some-wifi / PW: 123123</Text>
  //     <Cut />
  //   </Printer>
  // );
  // const { printerInfo, printerInstance } = usePrinter();
  // const getPrint = async () => {
  //   // const data: Uint8Array = await render(receipt);
  //   // console.log(data)
  //   // try {
  //   //   /* Create new printer  */
  //   //   const printer = new Printer('XP-58');
  //   //   console.log('poke 1',printer)
  
  //   //   /* get Printers list  */
  //   //   const printerList = await printer.getPrinters();
  //   //   console.log('poke2', printerList)
  //   //   /* you can set the list in a state and use a select */
  //   //   /* printerList[0] for this example */
  //   //   printer.setPrinterName(printerList[0]);
  
  //   //   printer.text("IT WORKS!!! :D\n");
  //   //   printer.feed(2);
  //   //   printer.cut();
  //   //   printer.close();
  //   //   // await printer.print();
  //   // } catch (error) {
  //   //   /*  Handle error  */
  //   //   console.error(error)
  //   // }
  //   const testData = {
  //     title: 'Funciona',
  //     dateTime: '02.12.2021 12:00',
  //     store: "Jovanni's Store",
  //     instruction: 'Take this receipt to the nearest cash register to complete the purchase.',
  //     thankYouMessage: 'Thank you for shopping with us!',
  //     items: [
  //       {
  //         title: 'LAVATOIO 60CM ROVERE CHIARO MONDO 2.0',
  //         sku: '527030',
  //         price: '$00.00',
  //         barcode: '978020137962'
  //       },
  //       {
  //         title: 'DISPENSER SAPONE BIANCO LINEA POP',
  //         sku: '006001',
  //         price: '$00.00',
  //         barcode: '978020137444'
  //       },
  //       {
  //         title: 'P/SAPONE BIANCO LINEA POP',
  //         sku: '006001',
  //         price: '$00.00',
  //         barcode: '978020137666'
  //       }
  //     ],
  //   };
  // }

  // useEffect(() => {
  //   console.log('pokemon',printerInfo)

  // }, [])
  
  return (
    <div>
      <Button onClick={() => console.log('imprime')}>
        Imprimete
      </Button>
    </div>
  )
}

export default printer