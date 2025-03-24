/**
 * @Author: Gongxh
 * @Date: 2025-01-15
 * @Description: 
 */

import * as cc from "cc";
import * as fgui from "fairygui-cc";
import * as kunpo from "kunpocc";
import * as protobuf from "protobufjs";
import * as protoRoot from './Socket/proto/proto.js';

type ProtoType = typeof protoRoot;
const proto = (protoRoot["default"] || protoRoot) as ProtoType;
export const protocol = proto.com.kunpo.proto;

export { cc, fgui, kunpo, protobuf };

