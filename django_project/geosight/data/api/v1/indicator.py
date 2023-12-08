# coding=utf-8
"""
GeoSight is UNICEF's geospatial web-based business intelligence platform.

Contact : geosight-no-reply@unicef.org

.. note:: This program is free software; you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as published by
    the Free Software Foundation; either version 3 of the License, or
    (at your option) any later version.

"""
__author__ = 'irwan@kartoza.com'
__date__ = '29/11/2023'
__copyright__ = ('Copyright 2023, Unicef')

# from rest_framework import viewsets

from drf_yasg.utils import swagger_auto_schema
from core.api_utils import common_api_params, ApiTag, ApiParams
from geosight.data.forms.indicator import IndicatorForm
from geosight.data.models.indicator import Indicator
from geosight.data.serializer.indicator import (
    IndicatorBasicListSerializer
)
from .base import BaseApiV1, BaseApiV1Resource


class IndicatorViewSet(BaseApiV1Resource):
    """Indicator view set."""

    model_class = Indicator
    form_class = IndicatorForm
    serializer_class = IndicatorBasicListSerializer
    extra_exclude_fields = ['parameters']

    @swagger_auto_schema(
        operation_id='indicator-get',
        tags=[ApiTag.INDICATOR],
        manual_parameters=[
            *common_api_params,
            ApiParams.NAME_CONTAINS,
            ApiParams.DESCRIPTION_CONTAINS,
            ApiParams.SHORTCODE_CONTAINS,
            ApiParams.CREATED_BY_CONTAINS,
            ApiParams.PROJECT_SLUGS,
            ApiParams.PROJECT_IDS
        ],
        operation_description='Return list of accessed indicator for the user.'
    )
    def list(self, request, *args, **kwargs):
        """List of indicator."""
        return super().list(request, *args, **kwargs)

    @swagger_auto_schema(
        operation_id='indicator-detail',
        tags=[ApiTag.INDICATOR],
        manual_parameters=[],
        operation_description='Return detailed of indicator.'
    )
    def retrieve(self, request, id=None):
        """Return detailed of indicator."""
        return super().retrieve(request, id=id)

    # @swagger_auto_schema(
    #     operation_id='indicator-create',
    #     tags=[ApiTag.INDICATOR],
    #     manual_parameters=[],
    #     request_body=IndicatorBasicListSerializer.
    #     Meta.swagger_schema_fields['post_body'],
    #     operation_description='Create a indicator.'
    # )
    # def create(self, request, *args, **kwargs):
    #     """Create a indicator."""
    #     return super().create(request, *args, **kwargs)

    # @swagger_auto_schema(
    #     operation_id='indicator-detail-update',
    #     tags=[ApiTag.INDICATOR],
    #     manual_parameters=[],
    #     request_body=IndicatorBasicListSerializer.
    #     Meta.swagger_schema_fields['post_body'],
    #     operation_description='Replace a detailed of indicator.'
    # )
    # def update(self, request, *args, **kwargs):
    #     """Update detailed of indicator."""
    #     return super().update(request, *args, **kwargs)

    # @swagger_auto_schema(
    #     operation_id='indicator-detail-partial-update',
    #     tags=[ApiTag.INDICATOR],
    #     manual_parameters=[],
    #     request_body=IndicatorBasicListSerializer.
    #     Meta.swagger_schema_fields['post_body'],
    #     operation_description=(
    #             'Update just partial data based on payload '
    #             'a detailed of indicator.'
    #     )
    # )
    # def partial_update(self, request, *args, **kwargs):
    #     """Update detailed of basemap."""
    #     return super().partial_update(request, *args, **kwargs)

    @swagger_auto_schema(
        operation_id='indicator-detail-delete',
        tags=[ApiTag.INDICATOR],
        manual_parameters=[],
        operation_description='Delete a indicator.'
    )
    def destroy(self, request, id=None):
        """Destroy an object."""
        return super().destroy(request, id=id)

