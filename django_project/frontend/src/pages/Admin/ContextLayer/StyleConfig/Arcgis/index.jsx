/**
* GeoSight is UNICEF's geospatial web-based business intelligence platform.
*
* Contact : geosight-no-reply@unicef.org
*
* .. note:: This program is free software; you can redistribute it and/or modify
*     it under the terms of the GNU Affero General Public License as published by
*     the Free Software Foundation; either version 3 of the License, or
*     (at your option) any later version.
*
* __author__ = 'irwan@kartoza.com'
* __date__ = '13/06/2023'
* __copyright__ = ('Copyright 2023, Unicef')
*/

/* ==========================================================================
   ARCGIS STYLE
   ========================================================================== */

import React, { Fragment, useEffect } from 'react';
import parseArcRESTStyle from "../../../../../utils/esri/esri-style";

import PointInput from './PointInput'
import PolygonInput from './PolygonInput'
import PolylineInput from './PolylineInput'
import LabelStyle from '../../../LabelStyle'
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import FieldConfig from "../../../../../components/FieldConfig";

export function ArcgisConfigStyle({ data, update }) {
  const style = data.styles;

  const styleInput = () => {
    switch (style.classificationValueMethod) {
      case "classMaxValue":
      case "classExactValue":
        return style.classifications.map(classification => {
          return <div
            className='Classification'
            key={classification.label}>
            <div>
              {
                style.geometryType === "esriGeometryPolygon" ?
                  <PolygonInput
                    style={classification.style} update={update}/> :
                  style.geometryType === "esriGeometryPolyline" ?
                    <PolylineInput
                      style={classification.style} update={update}/> :
                    style.geometryType === "esriGeometryPoint" ?
                      <PointInput
                        style={classification.style} update={update}/> : ""
              }

            </div>
          </div>
        })
      case "noClassification":
        switch (style.geometryType) {
          case "esriGeometryPolygon":
            return <PolygonInput style={style.style} update={update}/>
          case "esriGeometryPolyline":
            return <PolylineInput style={style.style} update={update}/>
          case "esriGeometryPoint":
            return <PointInput style={style.style} update={update}/>
        }
    }
  }
  return <Fragment>{styleInput()}</Fragment>
}

/**
 * Map Config component.
 */
export default function ArcgisConfig(
  { originalData, setData, ArcgisData, useOverride = false }
) {
  const data = JSON.parse(JSON.stringify(originalData))

  useEffect(() => {
    if (data && ArcgisData?.data && ArcgisData?.data?.drawingInfo?.renderer) {
      const style = parseArcRESTStyle(ArcgisData.data)
      if (!data?.data_fields || data.data_fields.length === 0) {
        if (data?.default_styles?.data_fields) {
          data.data_fields = data?.default_styles?.data_fields
        } else {
          data.data_fields = ArcgisData?.data?.fields
        }
      }

      if (!data?.styles) {
        if (data?.default_styles?.styles) {
          data.styles = data?.default_styles?.styles
        } else {
          data.styles = style
        }
      }

      if (!data?.label_styles) {
        if (data?.default_styles?.label_styles) {
          data.label_styles = data?.default_styles?.label_styles
        }
      }
      update()
    }
  }, [data, ArcgisData])

  const update = () => {
    setData({ ...data })
  }
  return <Fragment>
    <div className='ArcgisConfig Label'>
      {
        useOverride ?
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={data?.override_label ? data?.override_label : false}
                  onChange={evt => setData({
                    ...data,
                    label_styles: null,
                    override_label: evt.target.checked
                  })}/>
              }
              label="Override label config from context layer"/>
          </FormGroup> : null
      }
      {
        (!useOverride || data.override_label) ?
          data.data_fields ?
            <div className='ArcgisConfigLabel'>
              <LabelStyle
                label_styles={data.label_styles}
                update={(label_styles) => {
                  data.label_styles = label_styles
                  update()
                }}/>
            </div> : <div>Loading</div> : null
      }
    </div>
    <div className='ArcgisConfig Fields'>
      {
        useOverride ?
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={data?.override_field ? data?.override_field : false}
                  onChange={evt => {
                    setData({
                      ...data,
                      data_fields: ArcgisData?.data?.fields,
                      override_field: evt.target.checked
                    })
                  }}/>
              }
              label="Override field config from context layer"/>
          </FormGroup> : null
      }
      {
        (!useOverride || data.override_field) ?
          data.data_fields ?
            <Fragment>
              <div className='ArcgisConfigFields'>
                <FieldConfig
                  data_fields={data.data_fields}
                  update={(fields) => {
                    data.data_fields = fields
                    update()
                  }}/>
              </div>
            </Fragment> : <div>Loading</div> : null
      }
    </div>
    <div className='ArcgisConfig Style'>
      {
        useOverride ?
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={data?.override_style ? data?.override_style : false}
                  onChange={evt => setData({
                    ...data,
                    styles: null,
                    override_style: evt.target.checked
                  })}/>
              }
              label="Override style from context layer style"/>
          </FormGroup> : null
      }
      {
        (!useOverride || data.override_style) ?
          data.styles ?
            <ArcgisConfigStyle data={data} update={update}/> :
            <div>Loading</div> : null
      }
    </div>
  </Fragment>
}

