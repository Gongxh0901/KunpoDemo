/** 
 * @Author: Gongxh
 * @Date: 2025-03-21
 * @Description: 
 */

#pragma once
#include "cocos/cocos.h"

namespace KunpoSDK {

    class SDKHelper {
    public:
        /** 单例 */
        static SDKHelper * getInstance();

        SDKHelper();
        /** 获取版本号 */
        std::string getVersionCode();
        /** 获取build号 */
        int getBuildCode();

    private:
        
    };

}


