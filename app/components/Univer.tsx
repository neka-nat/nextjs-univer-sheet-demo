'use client'

import "@univerjs/design/lib/index.css";
import "@univerjs/ui/lib/index.css";
import "@univerjs/sheets-ui/lib/index.css";
import "@univerjs/sheets-formula/lib/index.css";
import "@univerjs/sheets-numfmt/lib/index.css";

import { LocaleType, Tools, Univer, UniverInstanceType } from "@univerjs/core";
import { enUS as UniverDesignEnUS, defaultTheme } from "@univerjs/design";
import { UniverDocsPlugin } from "@univerjs/docs";
import { enUS as UniverDocsUIEnUS, UniverDocsUIPlugin } from "@univerjs/docs-ui";
import { UniverFormulaEnginePlugin } from "@univerjs/engine-formula";
import { UniverRenderEnginePlugin } from "@univerjs/engine-render";
import { enUS as UniverSheetsEnUS, UniverSheetsPlugin } from "@univerjs/sheets";
import { UniverSheetsFormulaPlugin } from "@univerjs/sheets-formula";
import { UniverSheetsNumfmtPlugin } from "@univerjs/sheets-numfmt";
import { enUS as UniverSheetsUIEnUS, UniverSheetsUIPlugin } from "@univerjs/sheets-ui";
import { enUS as UniverUIEnUS, UniverUIPlugin } from "@univerjs/ui";
import { useEffect, useRef } from "react";

const UniverSheet = function () {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) {
      throw Error('container not initialized');
    }
    const univer = new Univer({
      theme: defaultTheme,
      locale: LocaleType.EN_US,
      locales: {
        [LocaleType.EN_US]: Tools.deepMerge(
          UniverSheetsEnUS,
          UniverDocsUIEnUS,
          UniverSheetsUIEnUS,
          UniverUIEnUS,
          UniverDesignEnUS,
        ),
      }
    });
    
    // core plugins
    univer.registerPlugin(UniverRenderEnginePlugin);
    univer.registerPlugin(UniverUIPlugin, {
      container: containerRef.current,
      header: true,
      footer: true,
    });

    univer.registerPlugin(UniverDocsPlugin, {
      hasScroll: false,
    });
    univer.registerPlugin(UniverDocsUIPlugin);

    univer.registerPlugin(UniverSheetsPlugin);
    univer.registerPlugin(UniverSheetsUIPlugin);
    
    // sheet feature plugins
    univer.registerPlugin(UniverSheetsNumfmtPlugin);
    univer.registerPlugin(UniverFormulaEnginePlugin);
    univer.registerPlugin(UniverSheetsFormulaPlugin);
    
    // create univer sheet instance
    univer.createUnit(UniverInstanceType.UNIVER_SHEET, {})
  }, []);

  return (
    <div style={{ width: '100vw', height: '100vh' }} ref={containerRef} />
  );
};

export default UniverSheet;
