import React, { useEffect, useReducer, useState } from 'react';
import TopologyViewer from '@data-driven-forms/topology-viewer';

const Icons = {
  info: {
    width: 1024,
    height: 1024,
    transform: 'rotate(180) translate(-1050 -1024)',
    svgPathData:
      'M1041.6 471.771c-29.486 33.371-68.571 63.543-141.714 89.143 41.143 96 0.457 151.314-28.343 179.886-28.114 28.571-62.629 42.971-103.086 42.971-36.571 0-68.114-11.886-94.857-35.429-0.457 0.686-0.914 1.371-1.371 1.829l-73.371-544.457-453.029 353.6c-43.657-20.571-79.086-51.429-106.057-93.029s-40.457-87.543-40.457-137.829c0-70.4 25.143-130.743 75.2-180.8s110.4-75.2 180.8-75.2h621.714c60.571 0 112.229 21.486 155.2 64.229 42.971 42.971 64.229 105.6 64.229 155.2 0 24.686 10.971 105.829-54.857 179.886zM132.114 655.314l421.486-329.143 68.343 506.743c-74.286 102.629-162.286 117.943-217.829 117.943-74.971 0-139.429-26.514-192.457-79.771s-79.771-117.486-79.771-192.457c0-5.257 0.457-13.029 1.143-22.857-0.229-0.229-0.686-0.229-0.914-0.457z', // eslint-disable-line max-len
  },
  service: {
    width: 1304,
    height: 1024,
    transform: 'rotate(180) translate(-1350 -1024)',
    svgPathData:
      'M1316.571 621.486l-219.429 183.543v-146.743h-131.429c-0.229 0.229-0.229 0.686-0.457 0.914-39.314 67.2-92.571 120.457-159.771 159.771-67.2 39.086-140.571 58.743-220.343 58.743s-153.143-19.657-220.343-58.971c-67.2-39.314-120.457-92.571-159.771-159.771-39.086-67.2-58.743-140.571-58.743-220.114 0-24.914 1.829-49.143 5.714-72.686h-152.229l0.229-73.371h170.743c8.914-25.6 20.571-50.286 34.514-74.286 39.314-67.2 92.571-120.457 159.771-159.771s140.571-58.743 220.343-58.743c79.771 0 153.143 19.657 220.343 58.743 67.2 39.314 120.457 92.571 159.771 159.771 38.857 67.2 58.514 140.571 58.514 220.343 0 51.2-8.229 99.886-24.457 146.057h97.6v-146.514l219.429 183.086zM242.514 437.714c0 46.629 9.143 90.971 27.429 133.486s42.743 79.086 73.371 109.714c30.629 30.629 67.2 55.086 109.714 73.371s86.857 27.429 133.486 27.429c46.629 0 90.971-9.143 133.486-27.429s79.086-42.743 109.714-73.371c7.086-7.086 13.943-14.629 20.571-22.4h-265.371l0.229-73.371h311.314c2.057-4.571 4.343-9.143 6.171-13.714 18.286-42.514 27.429-86.857 27.429-133.486s-9.143-90.971-27.429-133.486c-18.286-42.514-42.743-79.086-73.371-109.714s-67.2-55.086-109.714-73.371c-42.514-18.286-86.857-27.429-133.486-27.429s-90.971 9.143-133.486 27.429c-42.514 18.286-79.086 42.743-109.714 73.371-27.886 27.886-50.514 60.571-68.114 98.057l310.4-0.229v-146.286l218.743 183.086-218.743 183.314v-146.514h-335.086c-5.029 23.314-7.543 47.086-7.543 71.543z', // eslint-disable-line max-len
  },
  registry: {
    width: 1204,
    height: 1024,
    transform: 'rotate(180) translate(-1200 -940)',
    svgPathData:
      'M799.314 529.6c3.2 5.257 4.8 11.2 4.8 17.371v226.971c0 7.086-2.057 13.714-5.943 19.657-4.114 5.943-9.371 10.057-16 12.571l-184.914 68.571c-3.886 1.371-7.771 2.057-11.657 2.057-0.229 0-0.457 0-0.457 0-0.229 0-0.457 0-0.457 0-3.886 0-7.771-0.686-11.657-2.057l-184.914-68.571c-6.629-2.514-11.886-6.629-16-12.571s-5.943-12.343-5.943-19.657v-226.971c0-6.171 1.6-12.114 4.8-17.371s7.543-9.6 12.8-12.571l184.914-73.829c4.8-2.743 10.286-4.343 16-4.343 0.229 0 0.457 0 0.457 0s0.457 0 0.457 0c5.714 0 11.2 1.371 16 4.343l184.914 73.829c5.257 2.971 9.6 7.086 12.8 12.571zM770.286 574.628l-185.371-82.286-185.6 82.286v32.229l185.6-78.4 185.371 78.4v-32.229zM770.286 678.857l-185.143-84.8-185.6 84.8v35.886l185.6-78.171 185.371 79.314-0.229-37.029zM486.4 355.2l-216 80c-4.571 1.6-8.914 2.514-13.486 2.514-0.229 0-0.457 0-0.686 0s-0.457 0-0.686 0c-4.571 0-8.914-0.914-13.486-2.514l-216-80c-7.771-2.971-13.943-7.771-18.743-14.629-5.029-6.857-7.314-14.629-7.314-22.857v-264.686c0-7.314 1.829-14.171 5.486-20.343s8.686-11.2 15.086-14.629l216-86.171c5.714-3.429 11.886-5.029 18.743-5.029 0.229 0 0.457 0 0.686 0s0.457 0 0.686 0c6.857 0 13.029 1.6 18.743 5.029l216 110.4c6.4 3.429 11.429 8.457 15.086 14.629s5.486 13.029 5.486 20.343v240.457c0 8.229-2.286 16-7.086 22.857-4.571 6.857-10.743 11.657-18.514 14.629zM472.686 87.543l-216.686-98.514-216.914 96v37.714l216.914-91.429 216.686 93.943v-37.714zM472.686 206.857l-216.686-98.971-216.914 98.971v41.829l216.914-91.2 216.686 92.571v-43.2zM1144.457 355.2l-216 80c-4.571 1.6-8.914 2.514-13.486 2.514-0.229 0-0.457 0-0.686 0s-0.457 0-0.686 0c-4.571 0-8.914-0.914-13.486-2.514l-216-80c-7.771-2.971-13.943-7.771-18.743-14.629s-7.086-14.4-7.086-22.857v-264.686c0-7.314 1.829-14.171 5.486-20.343s8.686-11.2 15.086-14.629l216-86.171c5.714-3.429 11.886-5.029 18.743-5.029 0.229 0 0.457 0 0.686 0s0.457 0 0.686 0c6.857 0 13.029 1.6 18.743 5.029l216 110.4c6.4 3.429 11.429 8.457 15.086 14.629s5.486 13.029 5.486 20.343v240.457c0 8.229-2.286 16-7.086 22.857s-10.971 11.657-18.743 14.629zM1130.971 87.543l-216.686-98.514-216.914 96v37.714l216.914-91.429 216.686 93.943v-37.714zM1130.971 206.857l-216.686-98.971-216.914 98.971v41.829l216.914-91.2 216.686 92.571v-43.2z', // eslint-disable-line max-len
  },
  blueprint: {
    width: 1330,
    height: 1024,
    transform: 'rotate(180) translate(-1000 -880)',
    svgPathData:
      'M78.629 225.143c-3.657 3.657-5.486 8-5.486 12.8v55.086h-73.143v-55.086c0-25.143 8.914-46.629 26.971-64.686 17.829-17.829 39.543-26.971 64.686-26.971h91.429v73.143h-91.657c-5.029 0.457-9.143 2.286-12.8 5.714zM997.257 705.143c-17.829 17.829-39.543 26.971-64.686 26.971h-621.714c-25.143 0-46.629-8.914-64.686-26.971-17.829-17.829-26.971-39.543-26.971-64.686v-621.943c0-25.143 8.914-46.629 26.971-64.686 17.829-17.829 39.543-26.971 64.686-26.971h621.943c25.143 0 46.629 8.914 64.686 26.971 17.829 17.829 26.971 39.543 26.971 64.686v621.943c-0.229 25.143-9.143 46.629-27.2 64.686zM951.086 18.514c0-5.029-1.829-9.143-5.486-12.8s-8-5.486-12.8-5.486h-621.943c-5.029 0-9.143 1.829-12.8 5.486s-5.486 8-5.486 12.8v621.943c0 5.029 1.829 9.143 5.486 12.8s8 5.486 12.8 5.486h621.943c5.029 0 9.143-1.829 12.8-5.486s5.486-8 5.486-12.8v-621.943zM0 1024.686h73.143v-147.429h-73.143v147.429zM0 732.114h73.143v-147.429h-73.143v147.429zM73.143 859.886c0 5.029 1.829 9.143 5.486 12.8s8 5.486 12.8 5.486h55.314v73.143h-55.314c-25.143 0-46.629-8.914-64.686-26.971-17.829-17.829-26.743-39.314-26.743-64.457v-55.771h73.143v55.771zM218.971 951.314h147.429v-73.143h-147.429v73.143zM726.171 872.686c3.657-3.657 5.486-8 5.486-12.8v-91.429h73.143v91.429c0 25.143-8.914 46.629-26.971 64.686-17.829 17.829-39.543 26.971-64.686 26.971h-55.543v-73.143h55.543c5.029-0.229 9.371-2.057 13.029-5.714zM438.4 951.314h147.429v-73.143h-147.429v73.143z', // eslint-disable-line max-len
  },
};
import {
  getSources,
  getServiceOfferings,
  getServicePlans,
  getServiceInstance,
  getServiceInventories,
  getServiceInstanceNodes,
  getServiceOfferingNodes,
} from '../api/ansible-tower';
import { paths } from '../routes';
import { Breadcrumb, BreadcrumbItem } from '@patternfly/react-core';
import { Link } from 'react-router-dom';
import DetailDrawer from '../components/detail-drawer';
import { getSourceTypes, getSourcesTypes } from '../api/sources';

const reducer = (state, { type, payload }) => {
  const states = {
    setEdges: (data) => ({ ...state, edges: data }),
    setNodes: (data) => ({ ...state, nodes: data }),
    setData: (data) => ({ ...state, ...data }),
    updateGraph: (data) => ({
      ...state,
      nodes: [...state.nodes, ...data.nodes],
      edges: [...state.edges, ...data.edges],
    }),
    markNode: (data) => ({ ...state, nodes: state.nodes.map((node) => (node.id === data.id ? { ...data } : node)) }),
  };
  return states[type](payload);
};

const initialState = {
  nodes: [],
  edges: [],
};

const ansibleSourceChildren = ({
  source,
  serviceOfferings,
  servicePlans,
  serviceInstances,
  serviceInventories,
  serviceInstanceNodes,
  serviceOfferingsNode,
  group,
}) => {
  const sourceId = `source-${source.id}`;

  return [
    {
      id: `${sourceId}-serviceOfferings`,
      title: 'ServiceOfferings',
      group,
      level: 0,
      nodeShape: 'square',
      nodeType: 'serviceOfferings',
      children: serviceOfferings.meta.count > 0 ? serviceOfferings.meta.count : undefined,
      parentId: source.id,
    },
    {
      id: `${sourceId}-servicePlans`,
      title: 'servicePlans',
      group,
      level: 0,
      nodeShape: 'square',
      nodeType: 'servicePlans',
      children: servicePlans.meta.count > 0 ? servicePlans.meta.count : undefined,
      parentId: source.id,
    },
    {
      id: `${sourceId}-serviceInstances`,
      title: 'serviceInstances',
      group,
      level: 0,
      nodeShape: 'square',
      nodeType: 'serviceInstances',
      children: serviceInstances.meta.count > 0 ? serviceInstances.meta.count : undefined,
      parentId: source.id,
    },
    {
      id: `${sourceId}-serviceInventories`,
      title: 'serviceInventories',
      group,
      level: 0,
      nodeShape: 'square',
      nodeType: 'serviceInventories',
      children: serviceInventories.meta.count > 0 ? serviceInventories.meta.count : undefined,
      parentId: source.id,
    },
    {
      id: `${sourceId}-serviceInstanceNodes`,
      title: 'serviceInstanceNodes',
      group,
      level: 0,
      nodeShape: 'square',
      nodeType: 'serviceInstanceNodes',
      children: serviceInstanceNodes.meta.count > 0 ? serviceInstanceNodes.meta.count : undefined,
      parentId: source.id,
    },
    {
      id: `${sourceId}-serviceOfferingsNode`,
      title: 'serviceOfferingsNode',
      group,
      level: 0,
      nodeShape: 'square',
      nodeType: 'serviceOfferingsNode',
      children: serviceOfferingsNode.meta.count > 0 ? serviceOfferingsNode.meta.count : undefined,
      parentId: source.id,
    },
  ];
};

// eslint-disable-next-line max-len
const buildNodes = ({
  source,
  serviceOfferings,
  servicePlans,
  serviceInstances,
  serviceInventories,
  serviceInstanceNodes,
  serviceOfferingsNode,
  group,
}) => {
  const sourceId = `source-${source.id}`;
  const nodes = [
    {
      id: sourceId,
      title: source.id,
      group,
      nodeShape: 'hexagon',
      nodeType: 'source',
      children: 6,
      originalId: source.id,
    },
  ];

  const structure = {
    source,
    serviceOfferings,
    servicePlans,
    serviceInstances,
    serviceInventories,
    serviceInstanceNodes,
    serviceOfferingsNode,
  };

  return {
    nodes,
    edges: [],
    structure: { ...structure, group },
  };
};

const createChildNodes = (source, children, nodeType, group, sourceId) => {
  const nodes = children.map((child) => ({
    title: child.name || child.title || child.id,
    group,
    level: 1,
    nodeShape: 'circle',
    id: `${parent.id}-${child.id}`,
    nodeType,
    parentId: parent.id,
    entityId: child.id,
    sourceId,
  }));
  const edges = children.map((child) => ({
    source: source.id,
    target: `${parent.id}-${child.id}`,
    directional: true,
    id: `edge-${parent.id}-${child.id}`,
  }));
  return {
    nodes,
    edges,
  };
};

const TopologyView = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const [data, setData] = useState({});
  const [open, setOpen] = useState(false);

  useEffect(() => {
    Promise.all([getSources(), getSourceTypes()]).then(async ([sources, sourceTypes]) => {
      const {
        data: { sources: sourcesTypes },
      } = await getSourcesTypes(sources.data.map(({ id }) => id));

      const promises = sources.data.map((source, group) => {
        const type = sourceTypes.data.find(
          (type) => type.id === sourcesTypes.find(({ id }) => id === source.id).source_type_id
        );

        const subCollections = [
          getServiceOfferings(source.id),
          getServicePlans(source.id),
          getServiceInstance(source.id),
          getServiceInventories(source.id),
          getServiceInstanceNodes(source.id),
          getServiceOfferingNodes(source.id),
        ];
        return Promise.all(subCollections).then(
          ([
            serviceOfferings,
            servicePlans,
            serviceInstances,
            serviceInventories,
            serviceInstanceNodes,
            serviceOfferingsNode,
          ]) =>
            buildNodes({
              source: { ...source, type },
              serviceOfferings,
              servicePlans,
              serviceInstances,
              serviceInventories,
              serviceInstanceNodes,
              serviceOfferingsNode,
              group,
            })
        );
      });
      return Promise.all(promises).then((trees) => {
        const structure = trees.reduce(
          (acc, { nodes, edges, structure }) => ({
            ...acc,
            nodes: [...acc.nodes, ...nodes],
            edges: [...acc.edges, ...edges],
            structure: {
              ...acc.structure,
              [structure.source.id]: structure,
            },
          }),
          { nodes: [], edges: [], structure: {} }
        );
        dispatch({ type: 'setData', payload: structure });
      });
    });
  }, []);

  const findAllChildren = (nodeIds, edges = []) => {
    let allEdges = [...edges];
    let newIds = [];
    nodeIds.forEach((id) => {
      allEdges.push(
        ...state.edges.filter(({ source, target }) => {
          if (source === id) {
            newIds.push(target);
          }

          return source === id;
        })
      );
    });
    if (newIds.length > 0) {
      return findAllChildren(newIds, allEdges);
    }

    return allEdges;
  };

  const handleNodeClick = (node) => {
    dispatch({ type: 'markNode', payload: { ...node, wasClicked: true } });
    setOpen(true);
    let drawerData;
    if (!node.wasClicked && node.nodeType === 'source') {
      drawerData = state.structure[node.originalId].source;
    } else {
      drawerData = state.structure[node.sourceId || node.parentId][node.nodeType].data.find(
        ({ id }) => id === node.entityId
      ) || {
        name: node.nodeType,
        id: node.id,
        entities: state.structure[node.parentId][node.nodeType],
      };
    }

    setData({
      type: node.nodeType,
      ...drawerData,
    });

    if (!node.wasClicked && node.children !== undefined) {
      let childNodes = [];
      let childEdges = [];
      if (node.nodeType === 'source') {
        childNodes = ansibleSourceChildren({ ...state.structure[node.originalId], group: node.group });
        childEdges = childNodes.map(({ id }) => ({
          source: node.id,
          target: id,
          directional: true,
          id: `edge-${node.id}-${id}`,
        }));
      } else {
        const childStructure = createChildNodes(
          node,
          state.structure[node.parentId][node.nodeType].data,
          node.nodeType,
          state.structure[node.parentId].group,
          node.parentId
        );
        childNodes = childStructure.nodes;
        childEdges = childStructure.edges;
      }

      const nodes = [
        ...state.nodes.map((item) => ({
          ...item,
          wasClicked: item.wasClicked ? true : node.id === item.id,
          children: item.id === node.id ? undefined : item.children,
        })),
        ...childNodes,
      ];
      const edges = [...state.edges, ...childEdges];
      dispatch({ type: 'setData', payload: { nodes, edges } });
    } else if (node.wasClicked) {
      const originalNode = node;
      const obsoleteEdges = findAllChildren([node.id]);
      const nodes = state.nodes
        .filter((item) => !obsoleteEdges.find(({ target }) => target === item.id))
        .map((item) =>
          item.id === originalNode.id
            ? {
                ...originalNode,
                wasClicked: false,
                children: node.nodeType === 'source' ? 6 : state.structure[node.parentId][node.nodeType].meta.count,
              }
            : item
        );
      const edges = state.edges.filter((edge) => !obsoleteEdges.find(({ id }) => id === edge.id));
      dispatch({ type: 'setData', payload: { nodes, edges } });
    }
  };

  const iconMapper = {
    source: Icons.info,
    serviceOfferings: Icons.service,
    servicePlans: Icons.registry,
    serviceInstances: Icons.blueprint,
    serviceInventories: Icons.info,
    serviceInstanceNodes: Icons.info,
    serviceOfferingsNode: Icons.info,
  };

  return (
    <DetailDrawer open={open} data={data} setOpen={setOpen}>
      <Breadcrumb style={{ position: 'absolute' }} className="pf-u-m-lg">
        <BreadcrumbItem>
          <Link to={paths.index}>Topological inventory</Link>
        </BreadcrumbItem>
        <BreadcrumbItem isActive>Topology view</BreadcrumbItem>
      </Breadcrumb>
      <TopologyViewer
        handleNodeClick={handleNodeClick}
        edges={state.edges}
        nodes={state.nodes}
        iconMapper={iconMapper}
      />
    </DetailDrawer>
  );
};

export default TopologyView;
